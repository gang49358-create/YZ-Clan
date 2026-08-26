/* =========================================================
   YZ CLAN — UNIVERSAL JAVASCRIPT
   MAIN SITE + ADMIN PANEL
   LOCAL STORAGE VERSION
========================================================= */


/* =========================================================
   ADMIN CONFIG
========================================================= */

const ADMIN_USERNAME = "AkashiSK8";
const ADMIN_PASSWORD = "YZ_Admin_2026";

const STORAGE_KEYS = {
    AUTH: "yz_admin_auth",
    APPLICATIONS: "yz_applications",
    ROSTER: "yz_roster"
};


/* =========================================================
   DEFAULT ROSTER
========================================================= */

const DEFAULT_ROSTER = [

    {
        id: "yz001",
        nickname: "AkashiSK8",
        rank: "LEADER",
        role: "COMMANDER",
        level: "65+",
        activity: "8–10 H/DAY",
        status: "ACTIVE",
        description:
            "Основатель и лидер YZ. Стратегия, организация состава и командование."
    },

    {
        id: "yz002",
        nickname: "Agent",
        rank: "DEPUTY",
        role: "COMMANDER",
        level: "65+",
        activity: "8+ H/DAY",
        status: "ACTIVE",
        description:
            "Заместитель лидера. Координация состава и поддержка командования."
    },

    {
        id: "yz003",
        nickname: "Byak",
        rank: "VETERAN",
        role: "COMBATER",
        level: "65+",
        activity: "8+ H/DAY",
        status: "ACTIVE",
        description:
            "Боевой игрок основного состава. PvP, рейды и боевые операции."
    },

    {
        id: "yz004",
        nickname: "Chad",
        rank: "VETERAN",
        role: "COMBATER",
        level: "65+",
        activity: "8+ H/DAY",
        status: "ACTIVE",
        description:
            "Штурмовой игрок. PvP, рейды и поддержка команды."
    }

];


/* =========================================================
   DEFAULT APPLICATIONS
========================================================= */

const DEFAULT_APPLICATIONS = [

    {
        id: "app001",
        nickname: "ShadowX",
        level: "74",
        activity: "8–10 H/DAY",
        age: "19",
        role: "COMBATER",
        experience: "2 года",
        discord: "ShadowX",
        about:
            "Активный PvP игрок. Ищу серьёзный активный клан.",
        status: "NEW",
        createdAt:
            new Date().toLocaleDateString("ru-RU")
    },

    {
        id: "app002",
        nickname: "Raider77",
        level: "69",
        activity: "7–9 H/DAY",
        age: "21",
        role: "RAIDER",
        experience: "1.5 года",
        discord: "Raider77",
        about:
            "Люблю рейды и командную игру. Готов играть каждый день.",
        status: "REVIEW",
        createdAt:
            new Date().toLocaleDateString("ru-RU")
    },

    {
        id: "app003",
        nickname: "Wolf",
        level: "66",
        activity: "6–8 H/DAY",
        age: "18",
        role: "SCOUT",
        experience: "1 год",
        discord: "Wolf",
        about:
            "Адекватный активный игрок.",
        status: "NEW",
        createdAt:
            new Date().toLocaleDateString("ru-RU")
    }

];


/* =========================================================
   MAIN SITE INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initMobileMenu();

        initFAQ();

        initJoinForm();

        initHeader();

        initRevealAnimations();

        initAdminPanel();

    }
);


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const menuButton =
        document.getElementById("menuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");


    /*
       Если мы на admin.html,
       этих элементов нет.
       Просто выходим без ошибки.
    */

    if (!menuButton || !mobileMenu) {
        return;
    }


    menuButton.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle(
                "active"
            );

        }
    );


    document
        .querySelectorAll(
            ".mobile-menu a"
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu.classList.remove(
                        "active"
                    );

                }
            );

        });

}


/* =========================================================
   FAQ
========================================================= */

function initFAQ() {

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    /*
       На admin.html FAQ нет.
    */

    if (!faqItems.length) {
        return;
    }


    faqItems.forEach(item => {

        const question =
            item.querySelector(
                ".faq-question"
            );

        const answer =
            item.querySelector(
                ".faq-answer"
            );


        if (!question || !answer) {
            return;
        }


        question.addEventListener(
            "click",
            () => {

                const isActive =
                    item.classList.contains(
                        "active"
                    );


                /*
                   Закрываем все FAQ
                */

                faqItems.forEach(
                    otherItem => {

                        otherItem.classList.remove(
                            "active"
                        );


                        const otherAnswer =
                            otherItem.querySelector(
                                ".faq-answer"
                            );


                        if (otherAnswer) {

                            otherAnswer.style.maxHeight =
                                null;

                        }

                    }
                );


                /*
                   Открываем выбранный
                */

                if (!isActive) {

                    item.classList.add(
                        "active"
                    );


                    answer.style.maxHeight =
                        answer.scrollHeight +
                        "px";

                }

            }
        );

    });

}


/* =========================================================
   JOIN FORM
========================================================= */

function initJoinForm() {

    const joinForm =
        document.getElementById(
            "joinForm"
        );


    /*
       Если это admin.html,
       формы вступления нет.
    */

    if (!joinForm) {
        return;
    }


    const successMessage =
        document.getElementById(
            "successMessage"
        );

    const resetForm =
        document.getElementById(
            "resetForm"
        );


    joinForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const levelInput =
                document.getElementById(
                    "level"
                );


            const level =
                Number(
                    levelInput?.value || 0
                );


            /*
               MINIMUM LEVEL
            */

            if (level < 65) {

                alert(
                    "Для вступления в YZ необходим 65+ уровень."
                );

                return;

            }


            /*
               FORM DATA
            */

            const formData = {

                id:
                    "app-" +
                    Date.now(),

                nickname:
                    getInputValue(
                        "nickname"
                    ),

                level:
                    level,

                activity:
                    getInputValue(
                        "hours"
                    ),

                hours:
                    getInputValue(
                        "hours"
                    ),

                experience:
                    getInputValue(
                        "experience"
                    ),

                contact:
                    getInputValue(
                        "contact"
                    ),

                discord:
                    getInputValue(
                        "contact"
                    ),

                age:
                    getInputValue(
                        "age"
                    ) || "—",

                role:
                    getInputValue(
                        "role"
                    ) || "COMBATER",

                about:
                    getInputValue(
                        "about-player"
                    ),

                status:
                    "NEW",

                createdAt:
                    new Date()
                        .toLocaleDateString(
                            "ru-RU"
                        )

            };


            /*
               SAVE APPLICATION
            */

            saveNewApplication(
                formData
            );


            console.log(
                "Новая заявка YZ:",
                formData
            );


            /*
               HIDE FORM
            */

            joinForm.style.display =
                "none";


            /*
               SHOW SUCCESS
            */

            if (successMessage) {

                successMessage.classList.add(
                    "active"
                );


                successMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        }
    );


    /*
       RESET
    */

    if (resetForm) {

        resetForm.addEventListener(
            "click",
            () => {

                joinForm.reset();


                if (successMessage) {

                    successMessage.classList.remove(
                        "active"
                    );

                }


                joinForm.style.display =
                    "block";


                joinForm.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }

}


/* =========================================================
   SAVE NEW APPLICATION
========================================================= */

function saveNewApplication(
    application
) {

    const applications =
        getApplications();


    applications.push(
        application
    );


    saveApplications(
        applications
    );

}


/* =========================================================
   HEADER BACKGROUND
========================================================= */

function initHeader() {

    const header =
        document.querySelector(
            ".header"
        );


    /*
       На admin.html используется
       .admin-header.
    */

    if (!header) {
        return;
    }


    const updateHeader =
        () => {

            if (
                window.scrollY > 50
            ) {

                header.style.background =
                    "rgba(5,5,5,.95)";

            } else {

                header.style.background =
                    "rgba(8,8,8,.78)";

            }

        };


    window.addEventListener(
        "scroll",
        updateHeader
    );


    updateHeader();

}


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

function initRevealAnimations() {

    const revealElements =
        document.querySelectorAll(
            ".requirement, .advantage, .rule, .stat"
        );


    if (
        !revealElements.length ||
        !("IntersectionObserver" in window)
    ) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.opacity =
                                "1";


                            entry.target.style.transform =
                                "translateY(0)";


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.1
            }
        );


    revealElements.forEach(
        element => {

            element.style.opacity =
                "0";


            element.style.transform =
                "translateY(25px)";


            element.style.transition =
                "opacity .6s ease, transform .6s ease";


            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   STORAGE
========================================================= */

function getRoster() {

    const data =
        localStorage.getItem(
            STORAGE_KEYS.ROSTER
        );


    if (!data) {

        const copy =
            [...DEFAULT_ROSTER];


        localStorage.setItem(
            STORAGE_KEYS.ROSTER,
            JSON.stringify(copy)
        );


        return copy;

    }


    try {

        const parsed =
            JSON.parse(data);


        if (!Array.isArray(parsed)) {
            throw new Error(
                "Invalid roster"
            );
        }


        return parsed;

    } catch {

        const copy =
            [...DEFAULT_ROSTER];


        localStorage.setItem(
            STORAGE_KEYS.ROSTER,
            JSON.stringify(copy)
        );


        return copy;

    }

}


function saveRoster(
    roster
) {

    localStorage.setItem(
        STORAGE_KEYS.ROSTER,
        JSON.stringify(roster)
    );

}


function getApplications() {

    const data =
        localStorage.getItem(
            STORAGE_KEYS.APPLICATIONS
        );


    if (!data) {

        const copy =
            [...DEFAULT_APPLICATIONS];


        localStorage.setItem(
            STORAGE_KEYS.APPLICATIONS,
            JSON.stringify(copy)
        );


        return copy;

    }


    try {

        const parsed =
            JSON.parse(data);


        if (!Array.isArray(parsed)) {
            throw new Error(
                "Invalid applications"
            );
        }


        return parsed;

    } catch {

        const copy =
            [...DEFAULT_APPLICATIONS];


        localStorage.setItem(
            STORAGE_KEYS.APPLICATIONS,
            JSON.stringify(copy)
        );


        return copy;

    }

}


function saveApplications(
    applications
) {

    localStorage.setItem(
        STORAGE_KEYS.APPLICATIONS,
        JSON.stringify(
            applications
        )
    );

}


/* =========================================================
   ADMIN INITIALIZATION
========================================================= */

function initAdminPanel() {

    const loginScreen =
        document.getElementById(
            "loginScreen"
        );

    const adminApp =
        document.getElementById(
            "adminApp"
        );


    /*
       Если это index.html,
       admin элементов нет.
    */

    if (
        !loginScreen ||
        !adminApp
    ) {

        return;

    }


    const loginForm =
        document.getElementById(
            "loginForm"
        );


    const logoutButton =
        document.getElementById(
            "logoutButton"
        );


    /*
       CHECK EXISTING LOGIN
    */

    const authenticated =
        localStorage.getItem(
            STORAGE_KEYS.AUTH
        ) === "true";


    if (authenticated) {

        showAdmin();

    } else {

        showLogin();

    }


    /*
       LOGIN
    */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            handleLogin
        );

    }


    /*
       LOGOUT
    */

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            logout
        );

    }


    /*
       ADMIN NAVIGATION
    */

    setupNavigation();


    /*
       APPLICATION SEARCH/FILTER
    */

    setupApplicationControls();


    /*
       PLAYER FORM
    */

    setupPlayerForm();


    /*
       ADD PLAYER
    */

    const addPlayerButton =
        document.getElementById(
            "addPlayerButton"
        );


    if (addPlayerButton) {

        addPlayerButton.addEventListener(
            "click",
            () => {

                openPlayerModal();

            }
        );

    }

}


/* =========================================================
   LOGIN
========================================================= */

function handleLogin(
    event
) {

    event.preventDefault();


    const usernameInput =
        document.getElementById(
            "loginUsername"
        );


    const passwordInput =
        document.getElementById(
            "loginPassword"
        );


    const error =
        document.getElementById(
            "loginError"
        );


    const username =
        usernameInput
            ? usernameInput.value.trim()
            : "";


    const password =
        passwordInput
            ? passwordInput.value
            : "";


    if (
        username ===
            ADMIN_USERNAME &&
        password ===
            ADMIN_PASSWORD
    ) {

        localStorage.setItem(
            STORAGE_KEYS.AUTH,
            "true"
        );


        if (error) {

            error.classList.remove(
                "visible"
            );

        }


        showAdmin();

    } else {

        if (error) {

            error.classList.add(
                "visible"
            );

        }


        if (passwordInput) {

            passwordInput.value =
                "";

            passwordInput.focus();

        }

    }

}


/* =========================================================
   SHOW LOGIN
========================================================= */

function showLogin() {

    const loginScreen =
        document.getElementById(
            "loginScreen"
        );


    const adminApp =
        document.getElementById(
            "adminApp"
        );


    if (loginScreen) {

        loginScreen.classList.remove(
            "hidden"
        );

    }


    if (adminApp) {

        adminApp.classList.remove(
            "visible"
        );

    }

}


/* =========================================================
   SHOW ADMIN
========================================================= */

function showAdmin() {

    const loginScreen =
        document.getElementById(
            "loginScreen"
        );


    const adminApp =
        document.getElementById(
            "adminApp"
        );


    if (loginScreen) {

        loginScreen.classList.add(
            "hidden"
        );

    }


    if (adminApp) {

        adminApp.classList.add(
            "visible"
        );

    }


    const operatorName =
        document.getElementById(
            "operatorName"
        );


    if (operatorName) {

        operatorName.textContent =
            ADMIN_USERNAME;

    }


    renderEverything();

}


/* =========================================================
   LOGOUT
========================================================= */

function logout() {

    localStorage.removeItem(
        STORAGE_KEYS.AUTH
    );


    location.reload();

}


/* =========================================================
   ADMIN NAVIGATION
========================================================= */

function setupNavigation() {

    document
        .querySelectorAll(
            ".admin-nav"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openAdminPage(
                        button.dataset.page
                    );

                }
            );

        });

}


function openAdminPage(
    page
) {

    document
        .querySelectorAll(
            ".admin-nav"
        )
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.page ===
                    page
            );

        });


    document
        .querySelectorAll(
            ".admin-page"
        )
        .forEach(section => {

            section.classList.toggle(
                "active",
                section.id ===
                    `page-${page}`
            );

        });


    if (
        page ===
        "dashboard"
    ) {

        renderDashboard();

    }


    if (
        page ===
        "applications"
    ) {

        renderApplications();

    }


    if (
        page ===
        "roster"
    ) {

        renderRosterEditor();

    }

}


/* =========================================================
   RENDER EVERYTHING
========================================================= */

function renderEverything() {

    renderDashboard();

    renderApplications();

    renderRosterEditor();

}


/* =========================================================
   DASHBOARD
========================================================= */

function renderDashboard() {

    const applications =
        getApplications();


    const roster =
        getRoster();


    const total =
        applications.length;


    const newCount =
        applications.filter(
            app =>
                app.status ===
                "NEW"
        ).length;


    const accepted =
        applications.filter(
            app =>
                app.status ===
                "ACCEPTED"
        ).length;


    const rejected =
        applications.filter(
            app =>
                app.status ===
                "REJECTED"
        ).length;


    setText(
        "statTotal",
        total
    );


    setText(
        "statNew",
        newCount
    );


    setText(
        "statAccepted",
        accepted
    );


    setText(
        "statRejected",
        rejected
    );


    setText(
        "sidebarNewCount",
        newCount
    );


    renderRecentApplications(
        applications
    );


    renderDashboardRoster(
        roster
    );

}


/* =========================================================
   RECENT APPLICATIONS
========================================================= */

function renderRecentApplications(
    applications
) {

    const container =
        document.getElementById(
            "recentApplications"
        );


    if (!container) {
        return;
    }


    const recent =
        [...applications]
            .reverse()
            .slice(
                0,
                5
            );


    if (!recent.length) {

        container.innerHTML = `
            <div class="empty-state">
                NO APPLICATIONS
            </div>
        `;

        return;

    }


    container.innerHTML =
        recent
            .map(
                app => `

                <div class="mini-application">

                    <div class="mini-avatar">
                        ${getInitials(
                            app.nickname
                        )}
                    </div>

                    <div class="mini-player-info">

                        <strong>
                            ${escapeHtml(
                                app.nickname
                            )}
                        </strong>

                        <span>
                            LVL
                            ${escapeHtml(
                                app.level
                            )}
                            •
                            ${escapeHtml(
                                app.activity ||
                                app.hours ||
                                "—"
                            )}
                        </span>

                    </div>

                    <span
                        class="status-badge ${escapeHtml(
                            app.status
                        )}"
                    >
                        ${escapeHtml(
                            app.status
                        )}
                    </span>

                </div>

            `
            )
            .join("");

}


/* =========================================================
   DASHBOARD ROSTER
========================================================= */

function renderDashboardRoster(
    roster
) {

    const container =
        document.getElementById(
            "dashboardRoster"
        );


    if (!container) {
        return;
    }


    if (!roster.length) {

        container.innerHTML = `
            <div class="empty-state">
                YZ ROSTER IS EMPTY
            </div>
        `;

        return;

    }


    container.innerHTML =
        roster
            .slice(
                0,
                5
            )
            .map(
                player => `

                <div class="mini-player">

                    <div class="mini-avatar">
                        ${getInitials(
                            player.nickname
                        )}
                    </div>

                    <div class="mini-player-info">

                        <strong>
                            ${escapeHtml(
                                player.nickname
                            )}
                        </strong>

                        <span>
                            ${escapeHtml(
                                player.rank
                            )}
                            /
                            ${escapeHtml(
                                player.role
                            )}
                        </span>

                    </div>

                    <span class="status-badge ACCEPTED">
                        ${escapeHtml(
                            player.status
                        )}
                    </span>

                </div>

            `
            )
            .join("");

}


/* =========================================================
   APPLICATION CONTROLS
========================================================= */

function setupApplicationControls() {

    const search =
        document.getElementById(
            "applicationSearch"
        );


    const filter =
        document.getElementById(
            "applicationFilter"
        );


    if (search) {

        search.addEventListener(
            "input",
            renderApplications
        );

    }


    if (filter) {

        filter.addEventListener(
            "change",
            renderApplications
        );

    }

}


/* =========================================================
   APPLICATION LIST
========================================================= */

function renderApplications() {

    const container =
        document.getElementById(
            "applicationList"
        );


    if (!container) {
        return;
    }


    let applications =
        getApplications();


    const search =
        document
            .getElementById(
                "applicationSearch"
            )
            ?.value
            .toLowerCase()
            .trim() || "";


    const filter =
        document
            .getElementById(
                "applicationFilter"
            )
            ?.value ||
        "ALL";


    if (search) {

        applications =
            applications.filter(
                app =>
                    String(
                        app.nickname
                    )
                        .toLowerCase()
                        .includes(
                            search
                        )
            );

    }


    if (
        filter !==
        "ALL"
    ) {

        applications =
            applications.filter(
                app =>
                    app.status ===
                    filter
            );

    }


    if (!applications.length) {

        container.innerHTML = `
            <div class="empty-state">
                NO APPLICATIONS FOUND
            </div>
        `;

        return;

    }


    container.innerHTML =
        applications
            .slice()
            .reverse()
            .map(
                app => `

                <div class="application-row">

                    <div class="application-index">
                        ${escapeHtml(
                            String(
                                app.id
                            ).toUpperCase()
                        )}
                    </div>

                    <div class="application-main">

                        <div class="application-name">
                            ${escapeHtml(
                                app.nickname
                            )}
                        </div>

                        <div class="application-meta">

                            <span>
                                LVL
                                ${escapeHtml(
                                    app.level
                                )}
                            </span>

                            <span>
                                ${escapeHtml(
                                    app.activity ||
                                    app.hours ||
                                    "—"
                                )}
                            </span>

                            <span>
                                ${escapeHtml(
                                    app.role ||
                                    "COMBATER"
                                )}
                            </span>

                            <span>
                                ${escapeHtml(
                                    app.status
                                )}
                            </span>

                        </div>

                    </div>

                    <div class="application-actions">

                        <button
                            class="small-button"
                            onclick="viewApplication('${escapeJs(
                                app.id
                            )}')"
                        >
                            VIEW
                        </button>

                        <button
                            class="small-button accept"
                            onclick="acceptApplication('${escapeJs(
                                app.id
                            )}')"
                        >
                            ACCEPT
                        </button>

                        <button
                            class="small-button reject"
                            onclick="rejectApplication('${escapeJs(
                                app.id
                            )}')"
                        >
                            REJECT
                        </button>

                    </div>

                </div>

            `
            )
            .join("");

}


/* =========================================================
   VIEW APPLICATION
========================================================= */

function viewApplication(
    id
) {

    const applications =
        getApplications();


    const app =
        applications.find(
            item =>
                String(
                    item.id
                ) ===
                String(id)
        );


    if (!app) {

        alert(
            "Заявка не найдена."
        );

        return;

    }


    const nameElement =
        document.getElementById(
            "modalApplicationName"
        );


    const statusElement =
        document.getElementById(
            "modalApplicationStatus"
        );


    const details =
        document.getElementById(
            "applicationDetails"
        );


    if (nameElement) {

        nameElement.textContent =
            app.nickname;

    }


    if (statusElement) {

        statusElement.textContent =
            app.status;

        statusElement.className =
            "modal-status " +
            app.status;

    }


    if (details) {

        details.innerHTML = `

            <div class="detail-item">

                <span>
                    LEVEL
                </span>

                <strong>
                    ${escapeHtml(
                        app.level
                    )}
                </strong>

            </div>


            <div class="detail-item">

                <span>
                    ACTIVITY
                </span>

                <strong>
                    ${escapeHtml(
                        app.activity ||
                        app.hours ||
                        "—"
                    )}
                </strong>

            </div>


            <div class="detail-item">

                <span>
                    AGE
                </span>

                <strong>
                    ${escapeHtml(
                        app.age ||
                        "—"
                    )}
                </strong>

            </div>


            <div class="detail-item">

                <span>
                    ROLE
                </span>

                <strong>
                    ${escapeHtml(
                        app.role ||
                        "COMBATER"
                    )}
                </strong>

            </div>


            <div class="detail-item">

                <span>
                    RUST EXPERIENCE
                </span>

                <strong>
                    ${escapeHtml(
                        app.experience ||
                        "—"
                    )}
                </strong>

            </div>


            <div class="detail-item">

                <span>
                    DISCORD
                </span>

                <strong>
                    ${escapeHtml(
                        app.discord ||
                        app.contact ||
                        "—"
                    )}
                </strong>

            </div>


            <div class="detail-item">

                <span>
                    DATE
                </span>

                <strong>
                    ${escapeHtml(
                        app.createdAt ||
                        "—"
                    )}
                </strong>

            </div>


            <div class="detail-item full">

                <span>
                    ABOUT PLAYER
                </span>

                <p>
                    ${escapeHtml(
                        app.about ||
                        "—"
                    )}
                </p>

            </div>

        `;

    }


    const reviewButton =
        document.getElementById(
            "modalReviewButton"
        );


    const acceptButton =
        document.getElementById(
            "modalAcceptButton"
        );


    const rejectButton =
        document.getElementById(
            "modalRejectButton"
        );


    if (reviewButton) {

        reviewButton.onclick =
            () => {

                updateApplicationStatus(
                    id,
                    "REVIEW"
                );


                closeModal(
                    "applicationModal"
                );

            };

    }


    if (acceptButton) {

        acceptButton.onclick =
            () => {

                const accepted =
                    acceptApplication(
                        id
                    );


                if (accepted) {

                    closeModal(
                        "applicationModal"
                    );

                }

            };

    }


    if (rejectButton) {

        rejectButton.onclick =
            () => {

                const rejected =
                    rejectApplication(
                        id
                    );


                if (rejected) {

                    closeModal(
                        "applicationModal"
                    );

                }

            };

    }


    openModal(
        "applicationModal"
    );

}


/* =========================================================
   ACCEPT APPLICATION
========================================================= */

function acceptApplication(
    id
) {

    const applications =
        getApplications();


    const index =
        applications.findIndex(
            app =>
                String(
                    app.id
                ) ===
                String(id)
        );


    if (index === -1) {

        return false;

    }


    const app =
        applications[index];


    if (
        !confirm(
            `Принять ${app.nickname} в YZ?`
        )
    ) {

        return false;

    }


    /*
       UPDATE APPLICATION
    */

    applications[index].status =
        "ACCEPTED";


    saveApplications(
        applications
    );


    /*
       ADD TO ROSTER
    */

    const roster =
        getRoster();


    const alreadyExists =
        roster.some(
            player =>
                String(
                    player.nickname
                )
                    .toLowerCase() ===
                String(
                    app.nickname
                )
                    .toLowerCase()
        );


    if (!alreadyExists) {

        roster.push({

            id:
                "yz-" +
                Date.now(),

            nickname:
                app.nickname,

            rank:
                "MEMBER",

            role:
                app.role ||
                "COMBATER",

            level:
                String(
                    app.level ||
                    "65+"
                ),

            activity:
                app.activity ||
                app.hours ||
                "6–8 H/DAY",

            status:
                "ACTIVE",

            description:
                app.about ||
                "Новый участник YZ."

        });


        saveRoster(
            roster
        );

    }


    renderEverything();


    alert(
        `${app.nickname} принят в YZ.`
    );


    return true;

}


/* =========================================================
   REJECT APPLICATION
========================================================= */

function rejectApplication(
    id
) {

    const applications =
        getApplications();


    const index =
        applications.findIndex(
            app =>
                String(
                    app.id
                ) ===
                String(id)
        );


    if (index === -1) {

        return false;

    }


    const app =
        applications[index];


    if (
        !confirm(
            `Отклонить заявку ${app.nickname}?`
        )
    ) {

        return false;

    }


    applications[index].status =
        "REJECTED";


    saveApplications(
        applications
    );


    renderEverything();


    alert(
        `Заявка ${app.nickname} отклонена.`
    );


    return true;

}


/* =========================================================
   UPDATE APPLICATION STATUS
========================================================= */

function updateApplicationStatus(
    id,
    status
) {

    const applications =
        getApplications();


    const app =
        applications.find(
            item =>
                String(
                    item.id
                ) ===
                String(id)
        );


    if (!app) {
        return;
    }


    app.status =
        status;


    saveApplications(
        applications
    );


    renderEverything();

}


/* =========================================================
   ROSTER EDITOR
========================================================= */

function renderRosterEditor() {

    const container =
        document.getElementById(
            "rosterEditor"
        );


    if (!container) {
        return;
    }


    const roster =
        getRoster();


    if (!roster.length) {

        container.innerHTML = `
            <div class="empty-state">
                YZ ROSTER IS EMPTY
            </div>
        `;

        return;

    }


    container.innerHTML =
        roster
            .map(
                (player, index) => `

                <div
                    class="roster-editor-card"
                >

                    <div class="roster-editor-number">

                        YZ //
                        ${String(
                            index + 1
                        ).padStart(
                            3,
                            "0"
                        )}

                    </div>


                    <div class="roster-editor-avatar">

                        ${getInitials(
                            player.nickname
                        )}

                    </div>


                    <h3>

                        ${escapeHtml(
                            player.nickname
                        )}

                    </h3>


                    <div class="roster-editor-rank">

                        ${escapeHtml(
                            player.rank
                        )}

                        /

                        ${escapeHtml(
                            player.role
                        )}

                    </div>


                    <div class="roster-editor-stats">

                        <span>
                            LVL
                            ${escapeHtml(
                                player.level
                            )}
                        </span>

                        <span>
                            ${escapeHtml(
                                player.activity
                            )}
                        </span>

                        <span>
                            ${escapeHtml(
                                player.status
                            )}
                        </span>

                    </div>


                    <div class="roster-editor-actions">

                        <button
                            class="small-button"
                            onclick="editPlayer('${escapeJs(
                                player.id
                            )}')"
                        >
                            EDIT
                        </button>


                        <button
                            class="small-button reject"
                            onclick="deletePlayer('${escapeJs(
                                player.id
                            )}')"
                        >
                            DELETE
                        </button>

                    </div>

                </div>

            `
            )
            .join("");

}


/* =========================================================
   PLAYER MODAL
========================================================= */

function openPlayerModal(
    player = null
) {

    const modal =
        document.getElementById(
            "playerModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.add(
        "open"
    );


    const title =
        document.getElementById(
            "playerModalTitle"
        );


    if (player) {

        if (title) {

            title.textContent =
                "EDIT PLAYER";

        }


        setInputValue(
            "playerId",
            player.id
        );


        setInputValue(
            "playerNickname",
            player.nickname
        );


        setInputValue(
            "playerRank",
            player.rank
        );


        setInputValue(
            "playerRole",
            player.role
        );


        setInputValue(
            "playerLevel",
            player.level
        );


        setInputValue(
            "playerActivity",
            player.activity
        );


        setInputValue(
            "playerStatus",
            player.status
        );


        setInputValue(
            "playerDescription",
            player.description ||
            ""
        );

    } else {

        if (title) {

            title.textContent =
                "ADD PLAYER";

        }


        const form =
            document.getElementById(
                "playerForm"
            );


        if (form) {

            form.reset();

        }


        setInputValue(
            "playerId",
            ""
        );

    }

}


/* =========================================================
   EDIT PLAYER
========================================================= */

function editPlayer(
    id
) {

    const roster =
        getRoster();


    const player =
        roster.find(
            item =>
                String(
                    item.id
                ) ===
                String(id)
        );


    if (!player) {

        alert(
            "Игрок не найден."
        );

        return;

    }


    openPlayerModal(
        player
    );

}


/* =========================================================
   PLAYER FORM
========================================================= */

function setupPlayerForm() {

    const form =
        document.getElementById(
            "playerForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        savePlayer
    );

}


/* =========================================================
   SAVE PLAYER
========================================================= */

function savePlayer(
    event
) {

    event.preventDefault();


    const roster =
        getRoster();


    const id =
        getInputValue(
            "playerId"
        );


    const player = {

        id:
            id ||
            "yz-" +
            Date.now(),

        nickname:
            getInputValue(
                "playerNickname"
            ),

        rank:
            getInputValue(
                "playerRank"
            ),

        role:
            getInputValue(
                "playerRole"
            ),

        level:
            getInputValue(
                "playerLevel"
            ),

        activity:
            getInputValue(
                "playerActivity"
            ),

        status:
            getInputValue(
                "playerStatus"
            ),

        description:
            getInputValue(
                "playerDescription"
            )

    };


    if (!player.nickname) {

        alert(
            "Введите ник игрока."
        );

        return;

    }


    if (id) {

        const index =
            roster.findIndex(
                item =>
                    String(
                        item.id
                    ) ===
                    String(id)
            );


        if (index !== -1) {

            roster[index] =
                player;

        }

    } else {

        roster.push(
            player
        );

    }


    saveRoster(
        roster
    );


    closeModal(
        "playerModal"
    );


    renderEverything();


    alert(
        `${player.nickname} сохранён.`
    );

}


/* =========================================================
   DELETE PLAYER
========================================================= */

function deletePlayer(
    id
) {

    const roster =
        getRoster();


    const player =
        roster.find(
            item =>
                String(
                    item.id
                ) ===
                String(id)
        );


    if (!player) {

        return;

    }


    /*
       Защита от случайного удаления
    */

    if (
        !confirm(
            `Удалить ${player.nickname} из состава YZ?`
        )
    ) {

        return;

    }


    const updated =
        roster.filter(
            item =>
                String(
                    item.id
                ) !==
                String(id)
        );


    saveRoster(
        updated
    );


    renderEverything();


    alert(
        `${player.nickname} удалён из состава.`
    );

}


/* =========================================================
   MODALS
========================================================= */

function openModal(
    id
) {

    const modal =
        document.getElementById(
            id
        );


    if (modal) {

        modal.classList.add(
            "open"
        );

    }

}


function closeModal(
    id
) {

    const modal =
        document.getElementById(
            id
        );


    if (modal) {

        modal.classList.remove(
            "open"
        );

    }

}


/* =========================================================
   CLICK OUTSIDE MODAL
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (
            event.target.classList.contains(
                "modal-overlay"
            )
        ) {

            event.target.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================================
   ESC CLOSE MODAL
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !==
            "Escape"
        ) {

            return;

        }


        document
            .querySelectorAll(
                ".modal-overlay.open"
            )
            .forEach(
                modal => {

                    modal.classList.remove(
                        "open"
                    );

                }
            );

    }
);


/* =========================================================
   HELPERS
========================================================= */

function getInputValue(
    id
) {

    const element =
        document.getElementById(
            id
        );


    if (!element) {
        return "";
    }


    return element.value.trim();

}


function setInputValue(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.value =
            value ?? "";

    }

}


function setText(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.textContent =
            value;

    }

}


/* =========================================================
   INITIALS
========================================================= */

function getInitials(
    nickname
) {

    if (!nickname) {

        return "YZ";

    }


    const clean =
        String(
            nickname
        )
            .trim()
            .replace(
                /[^a-zA-Zа-яА-Я0-9]/g,
                ""
            );


    if (!clean) {

        return "YZ";

    }


    return clean
        .slice(
            0,
            2
        )
        .toUpperCase();

}


/* =========================================================
   HTML SECURITY
========================================================= */

function escapeHtml(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(
        value
    )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =========================================================
   JAVASCRIPT STRING SECURITY
========================================================= */

function escapeJs(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(
        value
    )
        .replaceAll(
            "\\",
            "\\\\"
        )
        .replaceAll(
            "'",
            "\\'"
        )
        .replaceAll(
            "\n",
            "\\n"
        )
        .replaceAll(
            "\r",
            "\\r"
        );

}