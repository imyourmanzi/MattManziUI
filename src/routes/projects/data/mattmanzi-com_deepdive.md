I have maintained this site since 2015, where I originally used it to host "lesson downloads" for students I tutored in my senior year of high school. That, and showcase my high school fixation on narwhals (more below).

### Technologies

Over the years, I taught myself (varying degrees of fluency in) different web technologies. Since this is the deep dive, I get to list them all out.

<div class="multiColumn">
<div>

#### Front-end

- HTML+CSS
- npm
- JavaScript
- Vue 1.x–3.x
- Svelte 1.x–3.x
- TypeScript

</div>
<div>

#### Backend/Cloud

- Django
- ASP.NET
- Go
- Perfect (Swift)

</div>
<div>

#### Server and Tooling

- git
- Linux CLI and scripting
- nginx
- Apache
- Ansible
- GCP/Firebase
- Terraform

</div>
</div>

### Really Nerdy Stuff

Owing to the fact that I started off learning just HTML and CSS (and for a while stubbornly refused to learn JavaScript), I picked up a trick that I thought was pretty cool back in high school: [CSS `@media` queries](https://css-tricks.com/a-complete-guide-to-css-media-queries/). Two in particular have stood the test of time throughout the many iterations of the codebase.

<div class="multiColumn">
<div>

#### Color Scheme

It is my personal opinion—and I’m sure many of you will agree—that every modern application should not only have light and dark themes, _but also_ adhere to the user’s preference. In recent years, this can be done almost effortlessly with browsers pulling color scheme preference from the operating system and then passing it along to this media query.

```css
/* Default colors for dark mode */
body {
  background-color: #011f3a;
  color: white;
  font-weight: 400;
}

a {
  color: #97b0ca;
}

/* Modifications for light mode */
@media screen and (prefers-color-scheme: light) {
  body {
    background-color: #fcfbf7;
    color: #011f3a;
  }

  a {
    color: #277ad3;
  }
}
```

What you see above is an excerpt of CSS from this site. Global colors are set for text in the `body` and `a` tags. Then, a media query watches for when the user’s device is set to light mode and applies the overriding styles. This makes it extremely useful for users whose devices are set to “auto” and will transition from light to dark around sunset. This CSS will ensure that site visitors never miss a beat and they don’t have to fiddle with an individual toggle for the website. And finally, it’s a JS-free solution that works on [all modern browsers](https://caniuse.com/prefers-color-scheme).

</div>
<div>

#### Aspect Ratio

When I started building my website, “mobile-first design” was a big buzzword and I was not going to be left out. 😤 So, with the CSS-only chip on my shoulder, I set out to find a solution that would solve my mobile-first woes. Media queries gives us access to a number of details about the device screen, but my favorite is the [`aspect-ratio`](https://caniuse.com/mdn-css_at-rules_media_aspect-ratio).

```css
/* Default styles for a wide screen */
#navigationLinks {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
}

/* Extra tall and skinny screens (i.e. smartphones) */
@media screen and (max-aspect-ratio: 767/1024) {
  #navigationLinks {
    justify-content: space-around;
  }
}
```

A common first pass at solving the mobile-first design problem was to pick a screen resolution width that couldn’t possibly be computer (because it would have such small value) so it must be a phone. However, at the time, mobile screens were boasting increasingly higher resolutions. Between that, certain operating system settings to tweak effective screen size, and tablets, it was near impossible to pick one number and have your website look how you wanted it to on most devices.

Enter `max-aspect-ratio`, which redefined the problem statement. It wasn’t “is this screen big or small?” but rather “is it wide or tall?” Now, elements that needed to be shifted due to width constraints could know the exact point where they should start saving width over height. And if you’re wondering about the obscure `767/1024` ratio, it was inspired by the aspect ratio of my iPhone 5S at the time.

</div>
</div>

### Time Capsule

Here's a snapshot of my a page from my original site in its infancy. Remember how I said “fixation on narwhals”? Well, the domain used to be `narwhalsandcode[.]com`. At this point in the timeline, I didn't understand JavaScript and the whole website was me using just HTML and CSS to build everything from scratch. Unfortunately, all that code is lost to time since I didn’t really start understanding git until I [ported to Vue](https://github.com/imyourmanzi/MattManziUI/tree/29f792fb163ff2d44c248539f412b122a1bd3722).

<div class="centeredImage">

![timecapsule.jpg](/img/projects/timecapsule.jpg)

</div>
