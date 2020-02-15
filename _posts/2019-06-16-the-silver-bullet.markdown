---
layout: post
title: "Why you should consider Mono Repo and Single Build? The Silver Bullet"
date: 2019-06-16 01:46:29 +0500
categories: blog
---

![Merge Hell](https://thepracticaldev.s3.amazonaws.com/i/o3nxkz8ay312w50o6n3n.jpg "Merge Hell")

If you have come on this blog by just reading the title and have some weird thoughts about something

specific, let me clarify that first, NO! I am not going to share 100 ways to kill a Wolf, not even a tip to knock out one. In fact, my title is inspired by a paper No Silver Bullet by Frederick P. Brooks, Jr. which I read during my graduation.

> There is no single development, in either technology or management technique, which by itself promises even one order of magnitude improvement within a decade in productivity, in reliability, in simplicity. [- No Silver Bullet by Frederick P. Brooks, Jr.](http://faculty.salisbury.edu/~xswang/Research/Papers/SERelated/no-silver-bullet.pdf)

</blockquote>
In this blog, I will explain how we started with existing workflow with First Project, what kind of problems we had, how can we solve them and what we are doing now for the Second Project.

## Drift with the current

Its been eight months we are working on our first project in PolarBears, Our target was to deliver the First Project as the web app, android app, and iOS App. To support these platforms we decided to develop an API, to have a shared implementation for both clients. So, we ended up creating three repositories for mobile, web and server. To maintain these repositories we divided our team into smaller teams according to available skills and knowledge for each platform. It was time to decide our development workflow, how we will handle branches, builds, deployments and environments.

We were a newly formed squad and most of the members didn't work with each other previously, our first challenge was to take the team to perform phase as described by Tuckman in his stages of group development. The second challenge was to deliver the project on time, by researching for best approaches or to study how the industry is tackling these issues, we might miss the deadline. So these two in mind we decided to adopt the existing workflow model for our project, which is used by most of the projects in my organization.

Let me explain that model, there are four environments Development, Quality, Staging, and Production, I will refer them as D, Q, S, and P. To support these environments you have four long-lived (always open) branches Default, Quality, Stable and Production. Every branch is configured with the Bamboo Build Plan which then triggers the Bamboo Deployment Plan for each environment. D is for daily development, Q is for testing by QA, S is for testing by PO and then P is for clients.

## Merge Hell

Let's dive into a known use-case with this workflow. If you want to promote your D environment to Q environment you just have to merge D branch into Q, by doing this the bamboo will trigger a build on a merge commit if that build results in success, it will then deployed to Q. Same flow for promoting Q to S and S to P. So, by this model if you need to release a new feature X to P environment. You have to develop it on D and then promote it via Q and S to P.The journey from D to P is not that simple as I have described, there are a number of caveats. There would be environment specific issues, and you'll note that these are not present in any other environment. (e.g. Client will report an issue which is working fine on D, Q, and S). I am sure most readers can tell the same story happened to them. So, the question is why this happened? Let me try to answer that question as my best knowledge, Remember that we have branches configured with the Bamboo Builds and whenever you commit code or merge a branch it triggers the Bamboo Build. So if you merge D to Q, Q to S, or S to P the Bamboo will build a new binary for each environment. Which means every time you merge, it seems like you have the same code on D and Q but actually, both builds are different and result in different binaries and deploy-able assets. This is the reason behind these magic words every developer have said once in his life.

> But, it's working on myMachine. [where myMachine = [D,Q,S] //in our case]

Let's say we find the issue somehow on other environment and need to fix that. So the question is how should we fix it? you may think that fix it on D and then promote it to Q, S, and P. Yes that's an option but won't it take too much time to fix a bug? Yes, it will take too much time. Why don't we just fix it on P and merge back to S, Q, and D? Yes, we usually use this option to hot-fix issues/bugs on P and sometimes on S and after that, our branches look like the image below also known as merge-hell.

![Merge Hell](https://thepracticaldev.s3.amazonaws.com/i/dq1lr666hds97xekp7wc.png "Merge Hell")

## The crux of the matter

If we analyze the chosen workflow model and count numbers we'll know what's wrong in it. So, we got three repositories mobile, web and server, each with 4 branches, 4 builds, 4 deployments and 4 environments. In total, we need to take care of 48 things just for a single project. And we did for eight months, It's not just maintenance but time, effort and cost related to this.

Apart from this cost, imagine if you have to release a new feature which spans across all platforms, with this workflow surely it will result in higher development to production time. With this model, it would be difficult for a developer to work across multiple platforms, which should not happen. We are not just making daily tasks painful but making the whole model less transparent. In order to know the status of a certain feature on another platform, you'll have to do extra work every time. As time passes there is a chance that you’ll be trained on that extra work and it would not be a problem, but higher chances are you'll be less curious and annoyed by doing the same thing again and again.

So, by design, we have introduced "Viscosity Of Environment” as stated by Robert C. Martin in his book,

> Viscosity comes in two forms: viscosity of the software and viscosity of the environment. When faced with a change, developers usually find more than one way to make that change. Some of the ways preserve the design; others do not (i.e., they are hacks). When the design-preserving methods are more difficult to use than the hacks, the viscosity of the design is high. It is easy to do the wrong thing but difficult to do the right thing. We want to design our software such that the changes that preserve the design are easy to make. The viscosity of the environment comes about when the development environment is slow and inefficient. For example, if compile times are very long, developers will be tempted to make changes that don't force a large recompile, even though those changes don't preserve the design. If the source code control system requires hours to check in just a few files, developers will be tempted to make changes that require as few check-ins as possible, regardless of whether the design is preserved. In both cases, a viscous project is one in which the design of the software is difficult to preserve. We want to create systems and project environments that make it easy to preserve and improve the design. - Agile Principles, Patterns, and Practices in C# by Robert C. Martin and Micah Martin

Another problem to consider is keeping the board updated, which is faced by many developers, including me. So, why doesn't someone fix this problem once for all? why can't we integrate Bitbucket with Jira and let them talk to each other on certain occasions like creating a branch, committing your code, creating a pull request, merging a pull request, and in result they keep the board updated? The answer to all these questions is YES we can and we did. I'll talk about this in detail in a future blog.

When Polar Bears Squad was formed, our first meeting was to define our value system, "Keep evolving ( nothing remains constant, change is good until it's positive)" was our first value. All these months we had evolution in our core, but, we were not in a position to change repositories, branches, build, environments and workflow for First Project because we were very near to v1.0 release, we knew that if we changed anything we may miss the deadline.

## A new direction

Three weeks ago we came to know that Second Project is ready to be taken by Polar Bears, and we were very excited to face the new challenge, wait wait wait!!! a new challenge? developing an app with the same technology, same workflow? same branching model? same database? same build plans? and the same deployments? it won’t be a challenge, It's just a “same coffee in new wrapping”. So what will be a challenge then? the challenge would be to fix all the above problems in the new project or at least try it. Here are our problems

#### Mono-Repo

Most top companies like Google, Microsoft, and Facebook are using a mono repository for their project. Mono-Repo means a single repository for everything, divided by folders and sub-folders for multiple projects and modules, they handle millions of commits daily by users and bots, with billions of file changes. Now the question is how they do it? Can tools (like git and mercurial we use daily) handle this amount of commits and data? Obviously not, these three companies have extended existing tools or created their own systems to handle this amount of data. But it doesn't mean we have to create ours too, our code base compared to these giant companies is nothing and these simple tools are able to handle our commits and file changes. So if we just use these tools with mono-repo we'd have support by default. You can read more on these [here](https://trunkbaseddevelopment.com/) and [here](https://github.com/cgbystrom/awesome-trunk-based-dev).
So, It means we can have a single repository having three folders for three platforms, and we will get support out of the box by daily use tools. That's great, isn't it?

#### One Branch

Now the question is aren't we combining all the 48 things to a single repository which was previously divided into three different repositories, we'll have twelve branches in a single repository to maintain and it would be worst then the previous model. Yes, it would be worse if we don't update our workflow with mono-repo. A popular approach which is used widely with mono-repo is trunk based development, which is

> A source-control branching model, where developers collaborate on code in a single branch called ‘trunk’, resist any pressure to create other long-lived development branches by employing documented techniques. They, therefore, avoid merge hell, do not break the build, and live happily ever after. [- Trunk Based Development](https://trunkbaseddevelopment.com/)

So if we adopt mono-repo with trunk based development we can reduce the number of branches to just 1.

#### One Build

To understand builds, deployments, and environments we need to see what responsibilities and functions they do or serve. Builds clone code, run the transformations over it, install dependencies, build code, create and publish artifacts. Deployments get published artifacts from the build and deploy them to an IP. Environments run on an IP, provides OS and Hosting Server for binaries.

Every time we commit new code or merge a branch we trigger build and success build triggers deployment. Below are actions executed by build and deployment. Steps may differ based on the project but you'll get an idea what I am talking about.

(**shared**: same for D, Q, S, and P | **separate**: unique for D, Q, S, and P)

#### #Build

1. Clone Code (shared)
2. Run Transformations (separate)
3. Select Configurations (separate)
4. Install Dependencies (shared)
5. Clean Build (shared)
6. Build (shared)
7. Create Artifacts (shared)
8. Publish Artifacts (shared)

If we look closely only actions which are unique for every environment are the reason to have multiple builds. If we are able to remove or fix those unique actions we can achieve one build. Transformations are smaller code changes which we need for a given environment like changing a variable value based on the environment. We can get rid of them easily if we optimize our code to use configuration settings for these smaller code changes. Now what is left is Configurations which will be different for every environment. If we just remove this step from the build and assign it to deployment to first select configuration before deploying artifacts, we will no longer have any need for multiple builds, and our builds can be reduced to 1.

4 Deployments and Environments
After changing build actions we will have the following actions for build and deployments.

#### #Build

1. Clone Code (shared)
2. Install Dependencies (shared)
3. Clean Build (shared)
4. Build (shared)
5. Create Artifacts (shared)
6. Publish Artifacts (shared)

#### #Deployment

1. Get Published Artifacts (shared)
2. Select Configurations (separate)
3. Deploy Artifacts to IP (separate)

Generally, deployments are tightly coupled with environments and if we need to reduce the number of deployments we’ll have to reduce the number of environments or have one deployment and change the way our configuration works. To change configurations we can use remote configurations which are supported by AWS, Firebase and other popular platforms. We'll have to implement a way to switch between different environments, And if your squad is using each environment daily, it would be a problem to do that. Let's keep deployments as is for web and server implementation, and focus on the mobile app. A mobile app consumes the API provided by the server or sometimes works on its own. So if our app is consuming the API and providing views and data based on API responses. We are just replacing the API base URL in our deployments and creating a separate deployment for D, Q, S, and P.For mobile, we can configure the deployments to build for P by default, and embed a hidden mechanism to enable D, Q, and S. To do that we can use any custom mechanism like tapping on app logo 10 times, etc. Once we have enabled developer settings or menu, we can provide a drop-down or radio buttons to select environments. To take more control we can provide them with feature-flags and remote configurations. There are already built systems ([featureflags](featureflags.io), [launch-darkly](https://launchdarkly.com/use-cases/), and [bullet-train](https://bullet-train.io)) which serve this very purpose. To read more about feature flags you can read [here](https://en.wikipedia.org/wiki/Feature_toggle).

So we have reduced our mobile deployment and environment to one, and the rest is the same for now. If there is an update on server or web deployments and environments, I’ll update this section.

## Time for action

So, for Second Project we are experimenting with this new workflow, with mono-repo, one build to rule all environments, reduced deployments and environments, It will help us to reduce development to production time. We'll be using bullet-train for feature flags and remote configurations, its free for 20,000 requests per month and will serve the purpose like a charm.

I’ll try to write another part of this with a proof of concept and technical details, so you can see everything in action. In summary, we have reduced repositories from 3 to 1, builds from 12 to 3, deployments from 12 to 9 and environments from 12 to 9. It’s not a big leap but it's your takeaway from this blog.

Those who didn't get the Wolf joke please read [this](https://en.wikipedia.org/wiki/Silver_bullet) first, and if you still didn’t get it. [Here](https://www.instructables.com/id/how-to-kill-a-werewolf-1/) is a three-step procedure to kill.

Please shout out your thoughts in the comments. Suggestions, criticism, improvements are highly appreciated.

Thanks
BA
