---
layout: /src/layouts/PostLayout.astro
title: Hawat
tags: ["priv-esc", "gobuster", "ssh", "persistence", "burpsuite", "directory-traversal"]
---

**Start 10:15 23-02-2025**

---
```
Scope:
192.168.246.147
```
# Recon

## Nmap

```bash
sudo nmap -sC -sV -vvvv -Pn -p- hawat -sT -T5 --min-rate=5000

PORT      STATE  SERVICE        REASON       VERSION
22/tcp    open   ssh            syn-ack      OpenSSH 8.4 (protocol 2.0)
| ssh-hostkey: 
|   3072 78:2f:ea:84:4c:09:ae:0e:36:bf:b3:01:35:cf:47:22 (RSA)
| ssh-rsa 
17445/tcp open   http           syn-ack      Apache Tomcat (language: en)
|_http-favicon: Unknown favicon MD5: 70ABF9F47A04ADA79F260A81FD3CE5CD
|_http-trane-info: Problem with XML parsing of /evox/about
| http-methods: 
|_  Supported Methods: GET HEAD OPTIONS
|_http-title: Issue Tracker
30455/tcp open   http           syn-ack      nginx 1.18.0
|_http-title: W3.CSS
| http-methods: 
|_  Supported Methods: GET HEAD POST
|_http-server-header: nginx/1.18.0
50080/tcp open   http           syn-ack      Apache httpd 2.4.46 ((Unix) PHP/7.4.15)
|_http-server-header: Apache/2.4.46 (Unix) PHP/7.4.15
|_http-title: W3.CSS Template
| http-methods: 
|   Supported Methods: GET POST OPTIONS HEAD TRACE
|_  Potentially risky methods: TRACE
```


## 17445/TCP - HTTP

![](../../../assets/77e049e37de7426df882fc633a27e3d5.png)

I tried to log in:

![](../../../assets/68c3ca0e7a157ae8682a08675641092a.png)

Then I tried out SQLi

![](../../../assets/160ee7b50300fee0dbb73ca0a70ba673.png)

But still got the same output.

![](../../../assets/3c17580bb0beeb50e799216f170529c9.png)

### Feroxbuster

![](../../../assets/b4f21f7dff8579cde25224a5af20d1da.png)

This didn't yield anything interesting, moving on for now.


## 30455/TCP - HTTP

![](../../../assets/f900cf2081775f941a70a502ea3f7d93.png)


### Feroxbuster

![](../../../assets/619a925ad76dc85b5a11db88d407eff1.png)

Nothing to report.


## 50080/TCP - HTTP

![](../../../assets/63a0f558bd0c79fed086b66eaeb48990.png)

![](../../../assets/b0997b1b2ecc54d794d7f14f6c26b46e.png)


### Feroxbuster

![](../../../assets/83ba2460d6660cd562b5cd110d8fc906.png)

This seemed interesting, let's check it out.

![](../../../assets/8566eb40b96f497db5102fe22d19a104.png)

We get another login form.

![](../../../assets/0a58acc0ba59bd79ee1d9da97bcaa949.png)

Looks like it is powered by **Netcloud**.

![](../../../assets/89e8ab307884caa07ec000edbc59fa24.png)

![](../../../assets/30d043f2b1435beb28fb313bfe691582.png)

Shit, let's try some easy ones.

![](../../../assets/bb888b0b9cfce98f20f32b73b40fa106.png)

`admin - admin` worked ez pz.

In here we find this file:

![](../../../assets/50480ababe3ea9612cc63626ddb18f97.png)

Which I then download and check out. After unzipping the folder this comes up:

![](../../../assets/f2f5326ece199c24dcc49e11284879dc.png)

I started looking from the top files first and discovered the following:

![](../../../assets/1286a5f400d87c5ff4b121315fbf22a7.png)

![](../../../assets/404fe2b526c7708f31b5b2ddbb226516.png)

```
issue_user
ManagementInsideOld797
```

Right under it was some SQL code:

![](../../../assets/74edd77a110403d8d3265337e70e54b2.png)


### Password Spraying

I tried to log in with the creds on port `17445` but it gave me another error.

![](../../../assets/ccc4adda40d2691618f597cc6f0c67db.png)

And the creds didn't work on SSH either:

![](../../../assets/aad9962569fc9c348d4d976490133cfd.png)


## SQLi

Let's take a closer look at the SQL query we found earlier:

```SQL
SELECT message FROM issue WHERE priority='"+priority+"'
```

>[!important]
>Oddly enough the query get's executed by the application, but it doesn't do anything with it?

This query get's issued on the GET request:

![](../../../assets/dc4dae8840d89fd018e87c16c854fc5b.png)

Meaning we need to see if we can inject this URL.


### Burpsuite

Let's launch burp.

![](../../../assets/e40ff4e13cfe36dee8344d30912f7643.png)

>[!important]
>Note that this will be the `17445` port, since that is where the **IssueTracker** application is based.

We will now start modifying the request.

Oddly enough nothing was happening when I started trying different payloads.

![](../../../assets/dc9a8f44ee21d495c91fc91778e73d73.png)

>[!fail]
>I then realized that this was failing due to me not having created an account first. I went ahead and clicked on **Register** where I created an account with the same creds as found and went to the `/issue/checkByPriority` endpoint again so burp could get the request.

![](../../../assets/4894e1666eb38711878674de607ee790.png)

Now when we issue the request via burp something completely different happens:

![](../../../assets/7d3ce0155b88a32d5b52c7be0018e5f9.png)

![](../../../assets/6efbb55ffd923623f136b9c688737408.png)

We notice that apparently only `POST` is allowed, contrary to what the source code told us.

I changed the request to `POST` and got a different error this time:

![](../../../assets/19dc72b97879c14871c1726f97bd113c.png)

I went ahead and sorted the `priority` by **Unbreak** as per the website:

![](../../../assets/b3d45a3d9d624ac2c6150c7849b39d81.png)

![](../../../assets/681e47e74e2ff351dc6903de6d17d02b.png)

We now got a `200` code, however it still showed us the **Normal** priorities as well:

![](../../../assets/53cfeb39005ac2cd7a458376413f9b5d.png)


### Reverse Shell via SQLi

Now we will encode the following payload as URL so we can get RCE.

```SQL
High' UNION SELECT '<?php echo system($_GET["cmd"]);' INTO OUTFILE '/srv/http/cmd.php'; --
```

![](../../../assets/d0714dd70c1f1df9d51d02b9e532caf1.png)

Now we will execute it in burp, if all went okay we should get a `200` code.

![](../../../assets/621d07c7189d0f1ddc85afdc9b53112e.png)

Awesome, let's see if it worked.

>[!important]
>For this we will head to port `30455`.

![](../../../assets/8c6b0ca5a34ea79e6b8a37adcdb31081.png)

![](../../../assets/978d550834e70a74b87129974137e03c.png)

Awesome.


# Foothold

Let's get ourselves a shell.

![](../../../assets/23550e98e34ef697dcb04af65ca2da58.png)

![](../../../assets/7b17a2b1acdbaf80ec1e55a386e9aecf.png)

![](../../../assets/1b58926fe39db6c8cc222c2487f61959.png)

>[!success]
>Thank god we're *root* right away, this shit took way too long


## proof.txt

![](../../../assets/1fa663565885da69d7f1a90e61744323.png)

>[!summary]
>Noone in their right mind would say this box was only **Easy**.
>I had to look up walkthroughs frequently to even begin to understand what I was supposed to do.
>Enumeration part was doable, the SQLi part *fucking* sucked though.

---

**Finished 11:58 23-02-2025**

[^Links]:  [[OSCP Prep]]

#SQLi #linux 