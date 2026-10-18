---
title: "Creating My First MCP Server"
description: "I wanted to have CLI command usage; had to create my own thing."
startDate: "2025-05-24"
publishedDate: ""
draft: true
tags: ["mcp", "TypeScript"]
---

I've been using Claude from Anthropic for my daily AI assistant tasks. I got real excited when 
Claude 3.7 was released and bit on their $15/month special at the time. You had to commit for a 
year, but with Claude Sonnet 3.5 dominating coding assistance for most of 2024, I figured it 
was safe to bet on Anthropic for another year. 

Then, OpenAI, Google, Meta, xAI, and pretty much every frontier AI model provider released 
updates after Claude 3.7 that were supposed to "make Claude obsolete". I'm really, really, 
exhausted of the paid posts that hype models around the time of release and all the company fan 
boys and girls that push them.

So, I was glad to see Anthropic drop Claude 4 Opus and Sonnet during their recent Code with 
Claude event. Once again, I can feel "on top of the AIs" and use Claude with the great Model 
Content Protocol to help me find solutions to all of my projects and their needs.

## A Battle of MCP Servers/Tools

Once you start using something like Claude Desktop you immediately gravitate to the list of 
available MCP servers and all their fancy tools. I won't go over what MCP is and the main parts 
of it, but I will link to their docs if you are unaware: 
[MCP documentation](https://modelcontextprotocol.io/introduction)

I can't wait till people start really using prompt templates, but for now MCP tools are the 
hotness, and everyone is creating servers with specific tools for the job. I also have many 
opinions of how to build and how not to build MCP servers geared towards tool usage, but I will 
speak more on that in another post.

> <PostLink title="How not to MCP" url="/writing/002-how-not-to-mcp" />

The moral of that post is generally this: do not add more tools than you need. In general, 
people seem to be adding way too many tools and servers which cause the AI assistants to become 
confused. 

Just think about it; if you had 200 tools in your toolbox in order to build a shed vs. 10 tools, 
how long would it take you to build the shed if you had to sort through all 200 tools every time 
you started working? It would be insane, and you'd probably never finish your shed. Hell, if all 
you had was a hammer, nails, and lumber, you'd probably be way faster and better at building the 
shed than with 200 fancy single-purpose tools. 

So, I landed in a situation where I wanted to do something simple, but I had to sort through MCP 
servers that did too much or simply did not work when I tried adding them to Claude Desktop's 
configuration.

## Use The TypeScript SDK

Luckily for us, there are SDKs for popular languages. I wanted to use a Go-based SDK, but upon 
looking at the [MCP SDK docs](https://modelcontextprotocol.io/sdk) I was curiously redirected to 
the Java SDK and did not see Go mentioned. 

I find it kind of funny you land on the Java SDK when I feel like every AI assistant I've used 
tells me they loathe Java and all its boilerplate. Ruby would probably be Claude's programming 
language of choice if someone got around to promoting it. 

But for most "official support" and examples, the clear choice is TypeScript. 