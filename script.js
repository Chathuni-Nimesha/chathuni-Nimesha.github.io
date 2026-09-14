(function () {
    var nav = document.querySelector(".site-nav");
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.querySelector(".nav-links");
    var navLinks = menu ? menu.querySelectorAll('a[href^="#"]') : [];
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- Unified project cards ---------- */

    var PROJECTS = [
        {
            section: "research",
            number: "",
            status: "Final-year research project · Ongoing",
            title: "AR-Assisted Sensor Placement & Coverage Optimization",
            tagline: "",
            description:
                "Ongoing final-year research on AR-assisted sensor placement and coverage optimization for smart greenhouse environments.",
            image: {
                jpg: "Images/projects/greenhands.jpg",
                webp: "Images/projects/greenhands.webp",
                alt: "AR greenhouse interface showing sensor grid, coverage, and blind-spot analysis"
            },
            pdf: "pdfs/GreenHands_UI.pdf",
            pdfLabel: "Open AR-Assisted Sensor Placement & Coverage Optimization project document",
            tech: ["Kotlin", "Jetpack Compose", "ARCore", "SceneView", "Android Studio"],
            features: [
                "Configurable virtual greenhouse grid with interactive sensor placement",
                "Sensor-type-specific coverage analysis and blind-spot identification",
                "Greedy candidate-based coverage optimization",
                "Real-scale AR visualization aligned with physical greenhouse layouts"
            ],
            github: null
        },
        {
            section: "projects",
            number: "01",
            status: "MVP · Current project",
            title: "SupportFlow AI",
            tagline: "AI Customer Support SaaS Platform",
            description:
                "Current MVP agent workspace for customer support with conversations, a knowledge base, and knowledge-grounded AI answers that an agent reviews before sending.",
            image: {
                jpg: "Images/projects/supportflow.jpg",
                webp: "Images/projects/supportflow.webp",
                alt: "SupportFlow AI agent workspace with conversation inbox and AI suggestions"
            },
            pdf: "pdfs/SupportFlow_AI_UI.pdf",
            pdfLabel: "Open SupportFlow AI project document",
            tech: ["React", "TypeScript", "Tailwind CSS", "Python", "FastAPI", "MongoDB Atlas", "Gemini", "RAG"],
            features: [
                "Workspace-based multi-tenancy with role-based access control",
                "Conversation and ticket workflows with AI-assisted replies",
                "Knowledge-base management with Gemini-powered RAG and vector search",
                "Analytics, global search, and RESTful FastAPI services"
            ],
            github: {
                href: "https://github.com/Chathuni-Nimesha/SupportFlow-AI",
                label: "View SupportFlow AI on GitHub"
            }
        },
        {
            section: "projects",
            number: "02",
            status: "Featured project",
            title: "Northline",
            tagline: "Secure Payment Checkout Platform",
            description:
                "Secure checkout experience built with Next.js, Stripe Payment Element, and PostgreSQL in Stripe test mode. Does not process live charges.",
            image: {
                jpg: "Images/projects/northline.jpg",
                webp: "Images/projects/northline.webp",
                alt: "Northline secure payment checkout landing page in Stripe test mode"
            },
            pdf: "pdfs/Payment_UI.pdf",
            pdfLabel: "Open Northline project document",
            tech: ["Next.js", "React", "TypeScript", "PostgreSQL", "Stripe"],
            features: [
                "PaymentIntent-based checkout with webhook handling",
                "Argon2id authentication with HTTP-only sessions",
                "CSRF protection, rate limiting, and security headers",
                "Payment history and CI-backed test coverage"
            ],
            github: {
                href: "https://github.com/Chathuni-Nimesha/payment-website",
                label: "View Northline on GitHub"
            }
        },
        {
            section: "projects",
            number: "03",
            status: "Featured project",
            title: "Nightlife",
            tagline: "Full-Stack Social Photography Platform",
            description:
                "Social photography platform with posts, reels, stories, comments, authentication, and content discovery built with React and Spring Boot.",
            image: {
                jpg: "Images/projects/nightlife.jpg",
                webp: "Images/projects/nightlife.webp",
                alt: "Nightlife photography platform feed with posts and stories"
            },
            pdf: "pdfs/Nightlife_UI.pdf",
            pdfLabel: "Open Nightlife project document",
            tech: ["React", "Java", "Spring Boot", "MySQL", "JWT"],
            features: [
                "Posts, likes, comments, follows, stories, and reels",
                "JWT authentication with ownership and privacy controls",
                "RESTful APIs with Spring Boot and MySQL",
                "Responsive dark-themed interface"
            ],
            github: {
                href: "https://github.com/Chathuni-Nimesha/Night-Photography",
                label: "View Nightlife on GitHub"
            }
        },
        {
            section: "projects",
            number: "04",
            status: "Featured project",
            title: "Grand Royal",
            tagline: "Luxury Restaurant Management System",
            description:
                "Full-stack restaurant platform with a public luxury site, live menu from the API, table reservations, and an admin dashboard for menu and booking management.",
            image: {
                jpg: "Images/projects/restaurant.jpg",
                webp: "Images/projects/restaurant.webp",
                alt: "Grand Royal luxury restaurant landing page with Book a Table call to action"
            },
            pdf: "pdfs/Hotel_UI.pdf",
            pdfLabel: "Open Grand Royal Luxury Restaurant Management System project document",
            tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
            features: [
                "Public landing page with menu data from a REST API",
                "Validated table reservation flow with success and error feedback",
                "Admin menu CRUD, availability toggle, and dashboard statistics",
                "Reservation search, filters, sorting, and inline edits"
            ],
            github: {
                href: "https://github.com/Chathuni-Nimesha/hotel-restaurant-system",
                label: "View Grand Royal restaurant system on GitHub"
            }
        },
        {
            section: "projects",
            number: "05",
            status: "Featured project",
            title: "CoreFlow",
            tagline: "Offline Workout & Habit Tracker",
            description:
                "Offline-first Android app for workouts, habits, reminders, elapsed-time tracking, and progress visualization using Kotlin and MVVM.",
            image: {
                jpg: "Images/projects/coreflow.jpg",
                webp: "Images/projects/coreflow.webp",
                alt: "CoreFlow Android app habits screen on a phone mockup"
            },
            pdf: "pdfs/Coreflow_UI.pdf",
            pdfLabel: "Open CoreFlow project document",
            tech: ["Kotlin", "Android", "XML", "MVVM", "Material 3"],
            features: [
                "Workout and habit tracking with local persistence",
                "Reminders and elapsed-time tracking",
                "PBKDF2-backed local authentication",
                "MVVM architecture with 69+ unit tests"
            ],
            github: {
                href: "https://github.com/Chathuni-Nimesha/coreflow-android",
                label: "View CoreFlow on GitHub"
            }
        }
    ];

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function renderProjectCard(project) {
        var techItems = project.tech.map(function (item) {
            return "<li>" + escapeHtml(item) + "</li>";
        }).join("");

        var featureItems = project.features.map(function (item) {
            return "<li>" + escapeHtml(item) + "</li>";
        }).join("");

        var taglineHtml =
            '<p class="project-tagline' + (project.tagline ? "" : " project-tagline--empty") + '">' +
                (project.tagline ? escapeHtml(project.tagline) : "&nbsp;") +
            "</p>";

        var numberHtml = project.number
            ? '<p class="project-number">' + escapeHtml(project.number) + "</p>"
            : "";

        var actionsHtml;
        if (project.github && project.github.href) {
            actionsHtml =
                '<div class="project-actions">' +
                    '<a class="btn-project" href="' + escapeHtml(project.github.href) + '" ' +
                        'target="_blank" rel="noopener noreferrer" ' +
                        'aria-label="' + escapeHtml(project.github.label) + '">' +
                        'GitHub <span aria-hidden="true">&rarr;</span>' +
                    "</a>" +
                "</div>";
        } else {
            actionsHtml = '<div class="project-actions project-actions--empty" aria-hidden="true"></div>';
        }

        return (
            '<article class="project-card">' +
                '<a class="project-media-link" href="' + escapeHtml(project.pdf) + '" ' +
                    'target="_blank" rel="noopener noreferrer" ' +
                    'aria-label="' + escapeHtml(project.pdfLabel) + '">' +
                    '<div class="project-media">' +
                        "<picture>" +
                            '<source type="image/webp" srcset="' + escapeHtml(project.image.webp) + '">' +
                            '<img src="' + escapeHtml(project.image.jpg) + '" ' +
                                'alt="' + escapeHtml(project.image.alt) + '" ' +
                                'width="1600" height="900" loading="lazy" decoding="async">' +
                        "</picture>" +
                    "</div>" +
                "</a>" +
                '<div class="project-body">' +
                    '<div class="project-meta">' +
                        '<p class="project-status">' + escapeHtml(project.status) + "</p>" +
                        numberHtml +
                    "</div>" +
                    "<h3>" + escapeHtml(project.title) + "</h3>" +
                    taglineHtml +
                    '<p class="project-desc">' + escapeHtml(project.description) + "</p>" +
                    '<ul class="skill-list" aria-label="Technologies used">' + techItems + "</ul>" +
                    "<h4>Key features</h4>" +
                    '<ul class="feature-list">' + featureItems + "</ul>" +
                    actionsHtml +
                "</div>" +
            "</article>"
        );
    }

    function renderProjectSections() {
        var researchGrid = document.getElementById("research-grid");
        var projectsGrid = document.getElementById("projects-grid");

        if (researchGrid) {
            researchGrid.innerHTML = PROJECTS.filter(function (project) {
                return project.section === "research";
            }).map(renderProjectCard).join("");
        }

        if (projectsGrid) {
            projectsGrid.innerHTML = PROJECTS.filter(function (project) {
                return project.section === "projects";
            }).map(renderProjectCard).join("");
        }
    }

    renderProjectSections();

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

        document.addEventListener("click", function (event) {
            var anchor = event.target.closest ? event.target.closest("a") : null;
            var href = anchor ? (anchor.getAttribute("href") || "") : "";

            if (/^(mailto:|tel:|https?:)/i.test(href)) {
                if (nav && !nav.contains(event.target)) {
                    setMenuOpen(false);
                }
                return;
            }

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
        }, {
            threshold: 0,
            rootMargin: "0px 0px -4% 0px"
        });

        revealItems.forEach(function (item) {
            revealObserver.observe(item);
        });
    } else {
        document.querySelectorAll(".reveal").forEach(function (item) {
            item.classList.add("is-visible");
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && toggle) {
            setMenuOpen(false);
            toggle.focus();
        }
    });
})();
