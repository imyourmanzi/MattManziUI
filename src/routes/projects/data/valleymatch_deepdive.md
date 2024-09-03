### Inception

The robotics team president called me with a plea: “Matt Manzi, everyone else thinks this is a dumb idea. But hear me out: we should make a dating app.” And her reasoning was sound. The annual fundraiser each year was usually selling pies for Pi Day, but it was hard to turn a profit after buying all the pies. This project would have no out-of-pocket cost, it married technology (much more representative of robotics than pies or 𝜋) with something every teenager fixates on (romance), and of course it had novelty.

On the other hand, it was still a gamble since we’d need approval from members of the faculty, including the principal, and then we’d have to actually _build_ a working system from scratch, all in about 5 weeks.

_Spoiler alert:_ We did all that, and netted over $300, a sizable amount for our small team.

### Project Plan

It was relatively simple: The president made a Google Form to accept responses and devised a rating system to use when comparing form responses. I wrote a Java batch process that would accept the responses in a single document and run what was essentially a O(n²) loop to compare all the results against each other, store them in a MySQL database, and email personalized results to each user who filled out the form. Once all the major details were nailed down, we would meet with the principal for approval of the fundraiser.

#### Compliance

While the meeting itself was a hurdle and perhaps a bit nerve-wracking, I didn’t quite understand why it needed to happen. We were doing all the work, it didn’t require any funding, and the whole thing was pretty benign. What could they be concerned about?

It turned out two things were of critical importance, which is clear in hindsight since we were collecting the data of minors.

1. The match-making tool had to be explicitly for friendship, _not_ dating. To make the matching algorithm compliant, we removed the ability for students to select what kind of people they’d be interested in being matched with.
2. All personally identifiable information was to be deleted after the fundraiser was over. That was easy enough since we used school accounts and computers to manage and process the data.

We submitted our course-corrected project plan and got our stamp of approval.

#### Access Codes

This was my favorite part of the system. I remember the process of brainstorming with the team about how to ensure that people couldn’t submit entries for free. As we put the pieces together, I felt the sophistication of our fundraiser jump from hobbyist project to real world solution.

We settled on manually generating a bunch of random strings (access codes) to place in a reference table that could be marked as used by someone when the database batch update was performed. I also implemented graceful handling for reused or invalid access codes that would even notify entrants of an error with their submissions.

### Code Review

As much I enjoyed building the system and still value it as an exceptional testament to my abilities at the time, it’s time now to dig up all the heinous decisions I made that can still be found in the GitHub repository (rant incoming).

Why did I use XLS files instead of CSVs for exporting form responses??……SQL injection from any form submission would have been trivially easy, and with almost no bounds.……To find access codes in a relational database I should _not_ have been LOOPING through the entire table!……In fact, I didn’t use _any_ `WHERE` clauses.……Instead of generating access codes manually, a library like [Nano ID](https://zelark.github.io/nano-id-cc/) would have been much easier.……To ensure uniqueness of access codes, I just needed a [set](<https://en.wikipedia.org/wiki/Set_(mathematics)>) instead of a nested validation loop…….I handled Windows vs. macOS differences, not by any kind of program logic, but by duplicating all the code?! It was Java for crying out loud!

I am giving myself a +1 for using doc-strings to document each file and some changes. A few other, more constructive thoughts also occurred when looking back at this code.

- I remember juggling a lot of overlapping code changes and it would have been nice to have used git for that.
- Containerizing the application dependencies would have saved me a lot of trouble recreating the environment on school computers.
- This project would have benefitted from a “control center” or some centralized executable, but instead I had to manually run the `java` command multiple times to process a single batch.
- Knowing now about the joys of understanding what your program is doing, I absolutely would have used a proper logger.
  - The same goes for a code linter.
