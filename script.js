(function () {
    var nav = document.querySelector(".site-nav");
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.querySelector(".nav-links");
    var navLinks = menu ? menu.querySelectorAll('a[href^="#"]') : [];
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function setMenuOpen(isOpen) {
        if (!toggle || !menu) {
            return;
        }

        menu.classList.toggle("is-open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
        document.body.classList.toggle("nav-open", isOpen);
    }

    if (toggle && menu) {
        toggle.addEventListener("click", function () {
            setMenuOpen(!menu.classList.contains("is-open"));
        });

        menu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                setMenuOpen(false);
            });
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                setMenuOpen(false);
                toggle.focus();
            }
        });

        document.addEventListener("click", function (event) {
            if (nav && !nav.contains(event.target)) {
                setMenuOpen(false);
            }
        });
    }

    window.addEventListener("scroll", function () {
        if (nav) {
            nav.classList.toggle("is-scrolled", window.scrollY > 8);
        }
    }, { passive: true });

    var sections = document.querySelectorAll("main section[id], header[id]");
    if ("IntersectionObserver" in window && sections.length && navLinks.length) {
        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                var id = entry.target.id;
                navLinks.forEach(function (link) {
                    var isActive = link.getAttribute("href") === "#" + id;
                    link.classList.toggle("is-active", isActive);
                    if (isActive) {
                        link.setAttribute("aria-current", "page");
                    } else {
                        link.removeAttribute("aria-current");
                    }
                });
            });
        }, {
            rootMargin: "-45% 0px -45% 0px",
            threshold: 0
        });

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }

    if (!reduceMotion && "IntersectionObserver" in window) {
        var revealItems = document.querySelectorAll(".reveal");
        var revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

        revealItems.forEach(function (item) {
            revealObserver.observe(item);
        });
    } else {
        document.querySelectorAll(".reveal").forEach(function (item) {
            item.classList.add("is-visible");
        });
    }

    document.querySelectorAll("[data-project-image]").forEach(function (media) {
        var src = media.getAttribute("data-project-image");
        if (!src) {
            return;
        }

        var image = new Image();
        image.onload = function () {
            image.alt = media.getAttribute("data-alt") || "";
            image.width = 1600;
            image.height = 900;
            image.loading = "lazy";
            image.decoding = "async";
            media.classList.remove("project-media--placeholder");
            media.removeAttribute("role");
            media.replaceChildren(image);
        };
        image.src = src;
    });
})();
