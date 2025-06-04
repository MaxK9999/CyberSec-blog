---
layout: /src/layouts/PostLayout.astro
title: Blackgate
tags: ["priv-esc", "gobuster", "ssh", "persistence", "burpsuite", "directory-traversal"]
---

**Start 14:35 08-01-2025**

---
```
Scope:
192.168.247.176
```
# Recon

## Nmap

```bash
sudo nmap -sC -sT -sV -oN nmap 192.168.247.176 -p- -T5 -vvvv --min-rate=5000

PORT   STATE SERVICE REASON  VERSION
22/tcp open  ssh     syn-ack OpenSSH 8.3p1 Ubuntu 1ubuntu0.1 (Ubuntu Linux; protocol 2.0)
6379/tcp open  redis   syn-ack Redis key-value store 4.0.14
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel
```

It appears there's only 2 services running of which we're probably only able to test `6379` right away.

It seems to be running on version **4.0.14**.

![](../../../assets/19fa539ec0a3efb80d23847d31f47910.png)

It seems that this exploitation can be done manually but also using metasploit:

![](../../../assets/c0258e0de02ffa6e6df1b78015987950.png)

![](../../../assets/d8da0ad1a28b59acd07632f39d3336f7.png)

We'll first try do some directory enumeration.


## Feroxbuster

This didn't give us anything:

![](../../../assets/23a83dd0dc61f8b296050f1e1e93826c.png)


# Initial Foothold

## 6379/TCP - Redis

I did some more digging since the GitHub page I first listed won't be useful, the payload that the person used is no longer available.

We'll have to find an alternative.

Luckily [hacktricks](https://book.hacktricks.wiki/en/network-services-pentesting/6379-pentesting-redis.html) comes to save the day yet again:

![](../../../assets/b488079d2dfe08dba9d1c71e9aace737.png)

![](../../../assets/88d69376d8850b56c69ebfdfcba3e9f6.png)

Let's try it from the easiest solution to the furthest.

```bash
nc -vn 192.168.247.176 6379

info
```

![](../../../assets/bc97b11da82991056ce542a5f4ea5ddf.png)

Since we can't do much from here we should get RCE asap.

![](../../../assets/905922721a7985f2229e4f578cb5f487.png)

![](../../../assets/0a0fca2ae54706330fa09a0d9dadbb86.png)

![](../../../assets/39107d344621bd361421e4aa72d7e8d7.png)

![](../../../assets/9ebcc93bdc9d9417afb0477077966753.png)

And we got our shell.


### local.txt

![](../../../assets/1a0ffedb8efc4bd0a7b1f5f6dfe250d5.png)


# Privilege Escalation

I then started to check on how to escalate my privileges when I found the following noteworthy:

![](../../../assets/1acefac8b63dfef19f372df3d7da278d.png)

It turns out this so called **protected mode** is turned off, and we can run `/usr/local/bin/redis-status` as `root`.

>[!note]
>I went ahead and gave myself an `.ssh` shell to get a stable environment.

I looked up what we could do with the protected mode off but didn't really find anything. Guess it's time to transfer over linpeas.

![](../../../assets/d48ace68711c4d053ff4d413564a45f6.png)

First thing I found was the OS version.

![](../../../assets/f7d313c7c492d5aa3b306ffd82dec017.png)

Then I found a PoC called `PwnKit` with a link to it, let's check it out.

![](../../../assets/ee7daa0c3c26a7d978a8d8210a80fd15.png)

We just had to go ahead and download over the binary and then execute it.


### proof.txt

![](../../../assets/3bb84ea3608953c9c0bed64e7977fe3c.png)

---

**Finished 15:38 08-01-2025**

[^Links]: [[OSCP Prep]]

#pwnkit #redis #hacktricks #priv-esc 