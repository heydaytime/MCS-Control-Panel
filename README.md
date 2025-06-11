
# Minecraft Server Control Panel

A simple web-based control panel to remotely manage a personal Minecraft server.

## About This Project

This project actually predates its upload to GitHub — the first version was originally built in **late 2021** as a spin-off of my global [chatroom](https://github.com/heydaytime/chat-app) website. I had the idea that with a few tweaks, I could convert the chatroom’s UI into a terminal-like interface for server management. Turns out, I was right.

The current version was rewritten from scratch sometime in **2022** (I think!). It was designed to let me remotely **start and stop** my Minecraft server and **dynamically allocate RAM** based on how many players were online. I was hosting the server on an old laptop and didn't want it running 24/7, especially since I only had a max of **three friends** playing with me at the time (yeah, I know... sad).

So instead of leaving the server on and wasting electricity, I made this tool to control it on-demand. Plus, it just seemed like a cool project idea.

## Features

![image](https://github.com/user-attachments/assets/540d3002-e46c-4d77-9f76-4445cba24669)

- 🖥️ **Start/Stop the server remotely**
- ⚙️ **Adjust RAM allocation**
- 🔒 **Login system** (basic, anyone could make an account — security wasn’t exactly tight)
- 📡 **Live terminal output** using WebSockets
- ⏱️ **Cron jobs** used to handle server start processes and keep it running in the background

> Also, surprisingly, **one other person** actually used this tool — which makes it one of the rare projects I’ve made that someone else touched. So that’s cool.

### Cool side story
> After that laptop broke I framed it! I think that was a given considering I did [this](https://www.youtube.com/watch?v=9FaRa8f1vFY&ab_channel=HeyDayTime) to it.
> I experimented so much on that laptop. I have so many fun memories with it... RIP.

![image](https://github.com/user-attachments/assets/db5571e2-67ab-4a15-9199-7a4eef0875c6)
