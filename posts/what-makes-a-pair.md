---
title: "What makes a pair?"
date: "2021-03-12"
---

Do you practice pair programming? If the answer to that is yes, how much thought do you put into *who* you pair with? It might just be whoever is available at the time, or who has context on the task at hand. One of the great benefits of pair programming is that it helps facilitate growth of the individuals in the pairing moreso than you might see if those same individuals worked in isolation.

There are many ways in which this growth can manifest, and it depends in part on the skill levels of the individuals in the pairing. It follows then, that by applying a bit of reasoning we can start to think about what pairings might lead to the growth we’re hoping for.

But first, a note on skills aquisition.

# **The Dreyfus model of skill acquisition**

The **[Dreyfus model of skill acquisition](https://en.wikipedia.org/wiki/Dreyfus_model_of_skill_acquisition)** is a model developed by brothers Stuart and Herbert Dreyfus in 1980. The model proposes that a student passes through five distinct stages on their journey to learn a new skill. Those stages are:

### **NOVICE**

The novice needs rules. They’re just starting to learn the basics, and trying to feed them any more information will likely just overwhelm them.

### **ADVANCED BEGINNER**

The advanced beginner has a reasonable grasp of the rules, and is now starting to test them. They’re trying to figure out why the rules are the rules. “What happens if I break the rules?”

### **COMPETENT**

The competent has a firm grasp of the rules, and can apply them to achieve a goal. They can ask the right questions in order to produce the desired outcome.

### **PROFICIENT**

The proficient has internalised the rules. Solutions appear fully formed in their head, and they start having insight/instinct/intuition on things that they may not have had before. They still lack confidence however, and they don’t yet trust that insight/instinct/intuition, so they fall back on the rules to guide them.

### **EXPERT**

The expert transcends the rules, and they are no longer confined to only think in those rules. There is a great analogy to chess grandmasters:

> The grandmaster doesn’t understand the game better than you, they simply have a greater pool of memories and experiences of past games to think back on. They contextualise the game in play relative to previous similar games. From there they are able to reduce the scope of thinking needed for them to come up with their next move.
>
> -- https://www.nature.com/articles/35088119

Likewise, the expert developer gains their expertise through their wealth of memories and experiences throughout their career. They’ve made many mistakes, and learned from those mistakes on their way to expertise. Many of the problems they are faced with, they have been exposed to and solved before. They then are well equipped to solve them again.

# **Applying the model**

So what does all of this have to do with pair programming? A lot, if you put your mind to it. It’s worth noting at this point, that it’s probably more valuable to consider skill levels in terms of particular skills, e.g. Javascript, .NET, SQL, rather than pegging someone broadly as a novice or proficient developer or whatever the case may be.

With that said, rate yourself according to the above levels of skill acquisition, you may wish to specifically target a skill you want to grow. Next, if you’re already doing pair programming, consider who you last paired with (if you’re not already doing pair programming, consider one of the other developers on your team). Rate them according to the levels of skills acquisition, and be honest without being unnecessarily scathing. Lastly, think about how that pairing went:

-   Did you accomplish the task or tasks you set out to achieve?
-   What was the quality of the end result? Were you happy with it?
-   What kinds of conversations were you having while pairing?
-   Did one person “drive” more than the other?1
    -   If so, was it agreed upon between the pair or did it happen organically?
    -   Was it done in order to “move faster”, or in order to help facilitate growth in the less experienced person?
-   Did you come away from the pairing feeling like you’d learned something new, or further cemented a previous learning?

Depending on the skill levels of a pairing, the outcome of that pairing can have *vastly* different results. For example:

### **EXPERT + NOVICE**

This is probably not a good pairing. Recall that the expert essentially no longer works in rules, but that is exactly what the novice needs to begin with. This will probably be a bad time for all involved, the novice will be asking the expert too many “dumb” questions2, and the expert won’t ever be able to give the novice a straight answer for what they need to do.

### **ADVANCED BEGINNER + ADVANCED BEGINNER**

This is an interesting pairing, as it will almost certainly lead to lots of really good learning for both parties. This is probably at the cost of lots of rule-breaking, however, so the quality of the output may necessitate more rigorous review before making its way to production.

### **COMPETENT + NOVICE**

This is a good pairing, as the competent is not yet operating on insight or intuition. They’ve just gotten really good at thinking in and applying the rules. They can help contextualise the rules for the novice, and answer their “why’s” as they grow into an advanced beginner.

### **EXPERT + PROFICIENT**

This is a very powerful pairing. If an individual is proficient, or on their way towards proficiency, they’ve made a choice to invest time and energy in that particular skill. The expert has been on that journey, and they’re really excited when someone else shows the same interest, so they’re eager to take the proficient under their wing so to speak. The expert is able to help guide the proficient on their journey towards expertise.

---

I’ve only discussed a handful of possible combinations here, there are many more with the potential for really valuable outcomes.

What are some of the pairings you’ve worked in?

What was your experience working with that combination?

1. “Driving” in this instance being a common term used for the person currently typing while pair programming.
2. There are no dumb questions.
