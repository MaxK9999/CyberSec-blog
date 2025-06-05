---
layout: /src/layouts/PostLayout.astro
title: Fired
tags: ["priv-esc", "gobuster", "ssh", "persistence", "burpsuite", "directory-traversal"]
---

**Start 09:50 01-05-2025**

---
```
Scope:
192.168.239.96
```
# Recon
## Nmap

```bash
sudo nmap -sC -sV fired -sT -T5 --min-rate=5000 -Pn -vvvv -p-

PORT     STATE SERVICE                REASON  VERSION                                                                                       
22/tcp   open  ssh                    syn-ack OpenSSH 8.2p1 Ubuntu 4ubuntu0.11 (Ubuntu Linux; protocol 2.0)                                 
9090/tcp open  hadoop-datanode        syn-ack Apache Hadoop                                                                                 
9091/tcp open  ssl/hadoop-tasktracker syn-ack Apache Hadoop
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
| hadoop-tasktracker-info: 
|_  Logs: jive-ibtn jive-btn-gradient
| hadoop-datanode-info: 
|_  Logs: jive-ibtn jive-btn-gradient
```

## 9090/TCP - HTTP

![](../../../assets/99cd6dfdc8160bee53d7af0ba6c8c1d9.png)

For this version I found an exploit on GitHub:

![](../../../assets/876beb4df8415e5d3dbfab3a4895c1ea.png)

![](../../../assets/25407632b5605ad999bd97a11f802179.png)

![](../../../assets/3b24f44db2130ca0af0db991e4228471.png)

Easy access.

I went to the `Email Settings` were I found the following:

![](../../../assets/97693cde0d44016523fced9512beb3fb.png)

```
root
7500e014a4f590847aed85e89117a853
```

Might come in handy.

![](../../../assets/00ff94eb010bd2d313e749a7bdf52740.png)

![](../../../assets/c749722a5ee6460032f9fee16d204617.png)

Unfortunately I was not successfull in cracking it.

## CVE-2023-32315

I found [the following PoC](https://www.vicarius.io/vsociety/posts/cve-2023-32315-path-traversal-in-openfire-leads-to-rce) on how to get RCE from here:

![](../../../assets/d34ef500d4f71a46c8b683761acd1c05.png)

I followed up the instructions:

![](../../../assets/bd563fd6c5e57f02fc5cca8237f95c2a.png)

![](../../../assets/43bfd9034db45c98c11ee7e4b7235dc3.png)

![](../../../assets/a26f34dc41e798a87ce1b3478b0785d8.png)

>[!important]
>Since we already have a `csrf` cookie we don't actually have to manipulate any requests which makes it way easier, we just have to go to the `/create-user.jsp` endpoint and create an admin user.

![](../../../assets/b30e1ccabe2f20e2f95fd893af612e0b.png)

![](../../../assets/83b00df8e3c1d7e05be3a601c382e0f8.png)


### Vulnerable Plugin

From here on we have to upload a vulnerable plugin which should give us RCE:

![](../../../assets/d2958d6d177cfb91e4f8d90a09da5c63.png)

![](../../../assets/84c83a0aadb3780333adb9574a3958c5.png)

Since we already have access and the created user we just have to download and upload the plugin.

![](../../../assets/9211911e6971f43ccc987f087cb082a8.png)

![](../../../assets/33288d43ea48428f22b91f2b0963095b.png)

### RCE

Next up we head to **Server -> Server Settings -> Management Tool**

![](../../../assets/f0158ed59d81c9440d9b0b7c3fbe6cbc.png)

The password is `123`. We then click on **system command** in the dropdown:

![](../../../assets/053cb91bb31b61de9bcd3c6447023289.png)

We can now execute commands:

![](../../../assets/94c68102884d2addfd631ec959518139.png)

# Foothold
## Shell as openfire

I use the following to get a reverse shell:

![](../../../assets/4f0c4053f1e84edd41212593d47f1244.png)

![](../../../assets/a1298948098fdcbbdb258e051efc16ca.png)

This user has a `/home` directory so let's get the `local.txt` flag.

### local.txt

![](../../../assets/eacac8c182d3f8791b690b483bda8e0a.png)

Other than that the directory is empty:

![](../../../assets/d292712c96f9e2dadf716df578001565.png)

## Enumeration

![](../../../assets/b53a718eb65ced8dd928542291a425fc.png)

I tried to transfer over files:

![](../../../assets/3f92b3ccbcbb66ea6099240e8ea27b0e.png)

>[!fail]
>Well that's new, let's see whether we can transfer them to the `/tmp` directory instead.

![](../../../assets/48d641d441b01d4c6caafc844509a60f.png)

This worked like a charm, I transferred over `pspy` as well.

![](../../../assets/5b2c5bb2ae931c179389091b0629056c.png)

![](../../../assets/ff2d6a712d0d3a6c67eeef78272627ce.png)

However I couldn't find anything interesting, thus I went into the `/usr/share/openfire` directory where I started snooping around.


# Privilege Escalation
## SSH as root

I found the following inside the `openfire.script` file:

![](../../../assets/7ff92e8353e98dff09673ace3e39905e.png)

![](../../../assets/8455fd2c8bde9ba3c2665d636565840c.png)

```
root
OpenFireAtEveryone
```

I could now log in via `ssh` and make my life easier.

![](../../../assets/25951ffb5307e4719e5b537e598ef75f.png)

## proof.txt

![](../../../assets/454f444044f7ff0c30202fd045ce5dc6.png)

>[!summary]
>As with previous OffSec boxes, there's a main CVE which creates the access, and then you need to enumerate really well and the privesc is super simple.

---

**Finished 11:52 01-05-2025**

[^Links]: [[OSCP Prep]]

#CVE #enumeration 