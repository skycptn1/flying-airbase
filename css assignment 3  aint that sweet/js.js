document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("image-track");

    window.onmousedown = e => {
        track.dataset.mouseDownAt = e.clientX;
    }
    window.onmouseup = () => {
        track.dataset.mouseDownAt = "0";
        track.dataset.prevPercentage = track.dataset.percentage;
    }
    window.onmousemove = e => {
        if (track.dataset.mouseDownAt === "0") return;
        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX, maxDelta = window.innerWidth / 2;
        const percentage = (mouseDelta / maxDelta) * -100,
            nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage, nextPercentage =
                Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

        track.dataset.percentage = nextPercentage;
        track.animate({
            transform: `translate(${nextPercentage}%, -50%)`
        }, { duration: 1200, fill: "forwards" });
        for (const image of track.getElementsByClassName("image")) {
            image.animate({
                objectPosition: `${100 + nextPercentage}% center`
            }, { duration: 1200, fill: "forwards" });
        } { shiftLogo(e, images); }
    }

    const logo = document.getElementById("logo"),
        images = logo.querySelectorAll("img");

    const getActive = () => document.body.dataset.active === "true",
        setActiveTo = active => document.body.dataset.active = active;

    const shift = (image, index, rangeX, rangeY) => {
        const active = getActive();

        const translationIntensity = active ? 24 : 4,
            maxTranslation = translationIntensity * (index + 1),
            currentTranslation = `${maxTranslation * rangeX}% ${maxTranslation * rangeY}%`;

        const scale = active ? 1 + (index * 0.4) : 1;

        image.animate({
            translate: currentTranslation,
            scale
        }, { duration: 750, fill: "forwards", easing: "ease" });
    }

    const shiftAll = (images, rangeX, rangeY) =>
        images.forEach((image, index) => shift(image, index, rangeX, rangeY));

    const shiftLogo = (e, images) => {
        const rect = logo.getBoundingClientRect(),
            radius = 1000;

        const centerX = rect.left + (rect.width / 2),
            centerY = rect.top + (rect.height / 2);

        const rangeX = (e.clientX - centerX) / radius,
            rangeY = (e.clientY - centerY) / radius;

        shiftAll(images, rangeX, rangeY);
    }


})