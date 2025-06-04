---
layout: /src/layouts/PostLayout.astro
title: Clue
tags: ["priv-esc", "gobuster", "ssh", "persistence", "burpsuite", "directory-traversal"]
---

**Start 15:48 22-01-2025**

---
```
Scope:
192.168.192.240
```
# Recon

## Nmap

```bash
sudo nmap -sC -sV -vvvv --min-rate=5000 -sT -T5 -p- 192.168.192.240

PORT     STATE  SERVICE          REASON       VERSION
22/tcp   open   ssh              syn-ack      OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0)
80/tcp   open   http             syn-ack      Apache httpd 2.4.38
|_http-server-header: Apache/2.4.38 (Debian)
| http-methods: 
|_  Supported Methods: OPTIONS HEAD GET POST
|_http-title: 403 Forbidden
139/tcp  closed netbios-ssn      conn-refused
445/tcp  closed microsoft-ds     conn-refused
3000/tcp open   http             syn-ack      Thin httpd
|_http-favicon: Unknown favicon MD5: 68089FD7828CD453456756FE6E7C4FD8
| http-methods: 
|_  Supported Methods: GET HEAD
|_http-server-header: thin
|_http-title: Cassandra Web
8021/tcp open   freeswitch-event syn-ack      FreeSWITCH mod_event_socket
Service Info: Host: 127.0.0.1; OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

port `80` gives error 403:

![](../../../assets/f37a9d7d291ae50a8948201133b92626.png)

port `3000` however is more successful:

![](../../../assets/97fc33565d94452c8fbedb2c96390a05.png)

No idea what it does yet, but it's open and mentions something like **Cassandra Web**.

![](../../../assets/12e26304d5e8f1cf606f1adbe2ae00f0.png)

`feroxbuster` didn't get me anywhere either.

Luckily I've found exploits for both ports, downside is, I don't know what versions are running so I cannot be certain.

![](../../../assets/97112054959004bf9f14005fbc89887d.png)

![](../../../assets/089850a6f41ddc851a9464807c1f8777.png)


## Remote File Read

I tried out the latter and surprisingly it worked right away!

![](../../../assets/b19857a9456e718e58f6090378973d03.png)

Since it worked I moved on to the second part of the PoC:

![](../../../assets/0da637804e59548ea11742c03e80079f.png)

![](../../../assets/105515ca507463d6dc1a1e3e457f38a6.png)

```bash
cassie
SecondBiteTheApple330
```

Hell yeah, we got creds for *cassie*. 

![](../../../assets/4d9c318b9f341039a16b59cc1cc25752.png)

Unfortunately we find unable to log in as *cassie*, so let's continue onto the other PoC found.

![](../../../assets/e14d6592dcf17ae46d6211f068851091.png)

This failed as well (eventhough the exploit itself did not!)

Let's check out SMB.


## 445/TCP - SMB

![](../../../assets/10f42ff9266c69df84d2516f76c92a56.png)

Thus I connected to `\backup` via `smbclient`:

![](../../../assets/611cae157a7f39bbff0d64888a003aa8.png)

After a while of fiddling around I found a zipped file called **changelog** which contained the version:

![](../../../assets/1d34d46b09ce77180e75f8c4ae4f001e.png)

However after a while of searching this didn't yield shite either.


## Foothold

According to [this article](https://developer.signalwire.com/freeswitch/FreeSWITCH-Explained/Modules/mod_event_socket_1048924/) the password should be stored in the following place:

![](../../../assets/fccd1268d15add4b15da5b3ee509e95b.png)

![](../../../assets/09acfd44d2ff4c81cb47508b9096f8f0.png)

So I used the previous exploit again to read the file:

![](../../../assets/029e8659e4c0abe1b1df3cefda4fc194.png)

```
StrongClueConEight021
```

Now all that was left was to modify the other PoC so it will use this password:

![](../../../assets/f5da39e329ff4a3189680897901c3126.png)

![](../../../assets/6528b25e64cb3c23a0fa0e00f02f1ba7.png)

![](../../../assets/a28328f03c4a33d0e9257b7a916ad5df.png)

Hell yeah, let's get a shell!

### Shell

![](../../../assets/7937658ab1555d5b6f208319b80188f8.png)

![](../../../assets/bc7a819d00901fb3ec755be6cfe634fa.png)


### local.txt

![](../../../assets/445e55676a95e18e12205de9ec9fe0ab.png)


# Lateral Movement

![](../../../assets/1a7be303cdbef4e8f20ae069049c12b7.png)

![](../../../assets/cd61e0ed6a0efe35e85547d3f8a373ba.png)

Awesome, we're now logged in as *cassie* at last. Let's enumerate the system.

![](../../../assets/1d1dfd374619b90d842ae91aa4a074ff.png)

Let's check what we can do with this binary:

![](../../../assets/1ee74fd9afec9aa1fb887485d3d54a96.png)

Perhaps we can run it using `sudo` which might then give us more stuff.

![](../../../assets/f3390c75964b194fa983fa22feb084b5.png)

Now using another terminal we could use `curl` try out the file read again.

![](../../../assets/c10c0a37fd4da3ab5856bc9239f34006.png)

Hell yeah it worked! Let's try some other files.

![](../../../assets/714522e9f9bafa53b9aa187d023558b2.png)

Even better! We've got *root*'s hash, let's crack it!

>[!fail]
>Since cracking the hash took too long I resulted to other measures.

I instead went ahead and read *anthony*'s `.bash_history` where I found the following:

![](../../../assets/97a4bff4fde4a3cce33e993919b54c35.png)

Holy shit this means that we can get *root* access through *anthony*'s auth keys!

![](../../../assets/709c5240ad622f0b9f58cc6a1b8c9735.png)


# Privilege Escalation

## Foothold

```bash
curl --path-as-is localhost:4444/../../../../../../../../home/anthony/.ssh/id_rsa > id_rsa
```

![](../../../assets/749803455c0f1a956143f42cb40fe5d5.png)


### proof.txt

![](../../../assets/1ce2c6ae6ae4db82c01a7468779402ee.png)


## Alternative Exploitation

Since there already is a `id_rsa` in *cassie*'s home directory from the start, we can just use that one to log into *root*.

![](../../../assets/ff8308a88f135b670a0274821fde5163.png)

---

**Finished 17:20 22-01-2025**

[^Links]:  [[OSCP Prep]]

#FreeSwitch #CassandraWeb 