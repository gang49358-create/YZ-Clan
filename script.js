/* =========================================
   YZ CLAN — MAIN JAVASCRIPT
   ========================================= */


/* MOBILE MENU */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
});


document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });

});


/* =========================================
   FAQ ACCORDION
   ========================================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        // Close all
        faqItems.forEach(otherItem => {

            otherItem.classList.remove("active");

            const otherAnswer =
                otherItem.querySelector(".faq-answer");

            otherAnswer.style.maxHeight = null;

        });


        // Open selected
        if (!isActive) {

            item.classList.add("active");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});


/* =========================================
   JOIN FORM
   ========================================= */

const joinForm = document.getElementById("joinForm");
const successMessage =
    document.getElementById("successMessage");

const resetForm =
    document.getElementById("resetForm");


joinForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const level =
        Number(document.getElementById("level").value);


    /*
       CHECK MINIMUM LEVEL
    */

    if (level < 65) {

        alert(
            "Для вступления в YZ необходим 65+ уровень."
        );

        return;

    }


    /*
       GET FORM DATA

       Здесь можно подключить отправку
       заявки в Discord / Telegram / Formspree
       или собственный сервер.
    */

    const formData = {

        nickname:
            document.getElementById("nickname").value,

        level:
            level,

        hours:
            document.getElementById("hours").value,

        experience:
            document.getElementById("experience").value,

        contact:
            document.getElementById("contact").value,

        about:
            document.getElementById("about-player").value

    };


    console.log(
        "Новая заявка YZ:",
        formData
    );


    /*
       HIDE FORM
    */

    joinForm.style.display = "none";


    /*
       SHOW SUCCESS
    */

    successMessage.classList.add("active");


    /*
       SCROLL TO MESSAGE
    */

    successMessage.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


/* =========================================
   RESET FORM
   ========================================= */

resetForm.addEventListener("click", () => {

    joinForm.reset();

    successMessage.classList.remove("active");

    joinForm.style.display = "block";

    joinForm.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


/* =========================================
   HEADER BACKGROUND
   ========================================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background =
            "rgba(5,5,5,.95)";

    } else {

        header.style.background =
            "rgba(8,8,8,.78)";

    }

});


/* =========================================
   SMOOTH REVEAL ANIMATION
   ========================================= */

const revealElements =
    document.querySelectorAll(
        ".requirement, .advantage, .rule, .stat"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.1
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity .6s ease, transform .6s ease";

    observer.observe(element);

});
/* =========================================================
   YZ ADMIN SYSTEM
   LOCAL STORAGE VERSION
========================================================= */


/* =========================================================
   CONFIG
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
        createdAt: new Date().toLocaleDateString("ru-RU")
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
        createdAt: new Date().toLocaleDateString("ru-RU")
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
        createdAt: new Date().toLocaleDateString("ru-RU")
    }

];


/* =========================================================
   STORAGE
========================================================= */

function getRoster() {

    const data =
        localStorage.getItem(
            STORAGE_KEYS.ROSTER
        );

    if (!data) {

        localStorage.setItem(
            STORAGE_KEYS.ROSTER,
            JSON.stringify(DEFAULT_ROSTER)
        );

        return [...DEFAULT_ROSTER];
    }

    try {

        return JSON.parse(data);

    } catch {

        localStorage.setItem(
            STORAGE_KEYS.ROSTER,
            JSON.stringify(DEFAULT_ROSTER)
        );

        return [...DEFAULT_ROSTER];
    }
}


function saveRoster(roster) {

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

        localStorage.setItem(
            STORAGE_KEYS.APPLICATIONS,
            JSON.stringify(DEFAULT_APPLICATIONS)
        );

        return [...DEFAULT_APPLICATIONS];
    }

    try {

        return JSON.parse(data);

    } catch {

        localStorage.setItem(
            STORAGE_KEYS.APPLICATIONS,
            JSON.stringify(DEFAULT_APPLICATIONS)
        );

        return [...DEFAULT_APPLICATIONS];
    }

}


function saveApplications(applications) {

    localStorage.setItem(
        STORAGE_KEYS.APPLICATIONS,
        JSON.stringify(applications)
    );

}


/* =========================================================
   LOGIN
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const loginScreen =
            document.getElementById("loginScreen");

        const adminApp =
            document.getElementById("adminApp");

        const loginForm =
            document.getElementById("loginForm");

        const logoutButton =
            document.getElementById("logoutButton");


        if (!loginScreen || !adminApp) {
            return;
        }


        const authenticated =
            localStorage.getItem(
                STORAGE_KEYS.AUTH
            ) === "true";


        if (authenticated) {

            showAdmin();

        } else {

            showLogin();

        }


        loginForm.addEventListener(
            "submit",
            handleLogin
        );


        logoutButton.addEventListener(
            "click",
            logout
        );


        setupNavigation();

        setupApplicationControls();

        setupPlayerForm();

        document
            .getElementById("addPlayerButton")
            ?.addEventListener(
                "click",
                () => openPlayerModal()
            );

    }
);


/* LOGIN */

function handleLogin(event) {

    event.preventDefault();


    const username =
        document
            .getElementById("loginUsername")
            .value
            .trim();

    const password =
        document
            .getElementById("loginPassword")
            .value;


    const error =
        document.getElementById(
            "loginError"
        );


    if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
    ) {

        localStorage.setItem(
            STORAGE_KEYS.AUTH,
            "true"
        );

        error.classList.remove("visible");

        showAdmin();

    } else {

        error.classList.add("visible");

        document
            .getElementById("loginPassword")
            .value = "";

    }

}


function showLogin() {

    document
        .getElementById("loginScreen")
        ?.classList.remove("hidden");

    document
        .getElementById("adminApp")
        ?.classList.remove("visible");

}


function showAdmin() {

    document
        .getElementById("loginScreen")
        ?.classList.add("hidden");

    document
        .getElementById("adminApp")
        ?.classList.add("visible");


    document
        .getElementById("operatorName")
        .textContent = ADMIN_USERNAME;


    renderEverything();

}


function logout() {

    localStorage.removeItem(
        STORAGE_KEYS.AUTH
    );

    location.reload();

}


/* =========================================================
   NAVIGATION
========================================================= */

function setupNavigation() {

    document
        .querySelectorAll(".admin-nav")
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


function openAdminPage(page) {

    document
        .querySelectorAll(".admin-nav")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.page === page
            );

        });


    document
        .querySelectorAll(".admin-page")
        .forEach(section => {

            section.classList.toggle(
                "active",
                section.id ===
                `page-${page}`
            );

        });


    if (page === "dashboard") {
        renderDashboard();
    }

    if (page === "applications") {
        renderApplications();
    }

    if (page === "roster") {
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
            app => app.status === "NEW"
        ).length;

    const accepted =
        applications.filter(
            app => app.status === "ACCEPTED"
        ).length;

    const rejected =
        applications.filter(
            app => app.status === "REJECTED"
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

    if (!container) return;


    const recent =
        [...applications]
            .reverse()
            .slice(0, 5);


    if (!recent.length) {

        container.innerHTML =
            `<div class="empty-state">
                NO APPLICATIONS
            </div>`;

        return;
    }


    container.innerHTML =
        recent.map(app => `

            <div class="mini-application">

                <div class="mini-avatar">
                    ${getInitials(app.nickname)}
                </div>

                <div class="mini-player-info">

                    <strong>
                        ${escapeHtml(app.nickname)}
                    </strong>

                    <span>
                        LVL ${escapeHtml(app.level)}
                        •
                        ${escapeHtml(app.activity)}
                    </span>

                </div>

                <span
                    class="status-badge ${app.status}"
                >
                    ${app.status}
                </span>

            </div>

        `).join("");

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

    if (!container) return;


    container.innerHTML =
        roster
            .slice(0, 5)
            .map(player => `

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

            `).join("");

}


/* =========================================================
   APPLICATIONS
========================================================= */

function setupApplicationControls() {

    document
        .getElementById("applicationSearch")
        ?.addEventListener(
            "input",
            renderApplications
        );


    document
        .getElementById("applicationFilter")
        ?.addEventListener(
            "change",
            renderApplications
        );

}


function renderApplications() {

    const container =
        document.getElementById(
            "applicationList"
        );

    if (!container) return;


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
            ?.value || "ALL";


    if (search) {

        applications =
            applications.filter(
                app =>
                    app.nickname
                        .toLowerCase()
                        .includes(search)
            );

    }


    if (filter !== "ALL") {

        applications =
            applications.filter(
                app =>
                    app.status === filter
            );

    }


    if (!applications.length) {

        container.innerHTML =
            `<div class="empty-state">
                NO APPLICATIONS FOUND
            </div>`;

        return;
    }


    container.innerHTML =
        applications
            .slice()
            .reverse()
            .map(app => `

                <div class="application-row">

                    <div class="application-index">
                        ${escapeHtml(
                            app.id.toUpperCase()
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
                                LVL ${escapeHtml(
                                    app.level
                                )}
                            </span>

                            <span>
                                ${escapeHtml(
                                    app.activity
                                )}
                            </span>

                            <span>
                                ${escapeHtml(
                                    app.role
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
                            onclick="viewApplication('${app.id}')"
                        >
                            VIEW
                        </button>

                        <button
                            class="small-button accept"
                            onclick="acceptApplication('${app.id}')"
                        >
                            ACCEPT
                        </button>

                        <button
                            class="small-button reject"
                            onclick="rejectApplication('${app.id}')"
                        >
                            REJECT
                        </button>

                    </div>

                </div>

            `).join("");

}


/* =========================================================
   VIEW APPLICATION
========================================================= */

function viewApplication(id) {

    const applications =
        getApplications();

    const app =
        applications.find(
            item => item.id === id
        );


    if (!app) return;


    document
        .getElementById(
            "modalApplicationName"
        )
        .textContent = app.nickname;


    document
        .getElementById(
            "modalApplicationStatus"
        )
        .textContent = app.status;


    const details =
        document.getElementById(
            "applicationDetails"
        );


    details.innerHTML = `

        <div class="detail-item">
            <span>LEVEL</span>
            <strong>${escapeHtml(app.level)}</strong>
        </div>

        <div class="detail-item">
            <span>ACTIVITY</span>
            <strong>${escapeHtml(app.activity)}</strong>
        </div>

        <div class="detail-item">
            <span>AGE</span>
            <strong>${escapeHtml(app.age)}</strong>
        </div>

        <div class="detail-item">
            <span>ROLE</span>
            <strong>${escapeHtml(app.role)}</strong>
        </div>

        <div class="detail-item">
            <span>RUST EXPERIENCE</span>
            <strong>${escapeHtml(app.experience)}</strong>
        </div>

        <div class="detail-item">
            <span>DISCORD</span>
            <strong>${escapeHtml(app.discord)}</strong>
        </div>

        <div class="detail-item">
            <span>DATE</span>
            <strong>${escapeHtml(app.createdAt)}</strong>
        </div>

        <div class="detail-item full">
            <span>ABOUT PLAYER</span>
            <p>${escapeHtml(app.about)}</p>
        </div>

    `;


    document
        .getElementById(
            "modalReviewButton"
        )
        .onclick = () => {

            updateApplicationStatus(
                id,
                "REVIEW"
            );

            closeModal(
                "applicationModal"
            );

        };


    document
        .getElementById(
            "modalAcceptButton"
        )
        .onclick = () => {

            acceptApplication(id);

            closeModal(
                "applicationModal"
            );

        };


    document
        .getElementById(
            "modalRejectButton"
        )
        .onclick = () => {

            rejectApplication(id);

            closeModal(
                "applicationModal"
            );

        };


    openModal(
        "applicationModal"
    );

}


/* =========================================================
   ACCEPT APPLICATION
========================================================= */

function acceptApplication(id) {

    const applications =
        getApplications();

    const index =
        applications.findIndex(
            app => app.id === id
        );


    if (index === -1) return;


    const app =
        applications[index];


    if (
        !confirm(
            `Принять ${app.nickname} в YZ?`
        )
    ) {
        return;
    }


    applications[index].status =
        "ACCEPTED";


    saveApplications(
        applications
    );


    /* Automatically add to roster */

    const roster =
        getRoster();


    const alreadyExists =
        roster.some(
            player =>
                player.nickname.toLowerCase() ===
                app.nickname.toLowerCase()
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
                app.role || "COMBATER",

            level:
                app.level || "65+",

            activity:
                app.activity || "6–8 H/DAY",

            status:
                "ACTIVE",

            description:
                app.about ||
                "Новый участник YZ."

        });


        saveRoster(roster);

    }


    renderEverything();


    alert(
        `${app.nickname} принят в YZ.`
    );

}


/* =========================================================
   REJECT
========================================================= */

function rejectApplication(id) {

    const applications =
        getApplications();

    const index =
        applications.findIndex(
            app => app.id === id
        );


    if (index === -1) return;


    const app =
        applications[index];


    if (
        !confirm(
            `Отклонить заявку ${app.nickname}?`
        )
    ) {
        return;
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

}


/* =========================================================
   STATUS
========================================================= */

function updateApplicationStatus(
    id,
    status
) {

    const applications =
        getApplications();


    const app =
        applications.find(
            item => item.id === id
        );


    if (!app) return;


    app.status = status;


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

    if (!container) return;


    const roster =
        getRoster();


    if (!roster.length) {

        container.innerHTML =
            `<div class="empty-state">
                YZ ROSTER IS EMPTY
            </div>`;

        return;
    }


    container.innerHTML =
        roster.map(
            (player, index) => `

                <div
                    class="roster-editor-card"
                >

                    <div class="roster-editor-number">
                        YZ // ${String(index + 1)
                            .padStart(3, "0")}
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
                            LVL ${escapeHtml(
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
                            onclick="editPlayer('${player.id}')"
                        >
                            EDIT
                        </button>

                        <button
                            class="small-button reject"
                            onclick="deletePlayer('${player.id}')"
                        >
                            DELETE
                        </button>

                    </div>

                </div>

            `
        ).join("");

}


/* =========================================================
   ADD / EDIT PLAYER
========================================================= */

function openPlayerModal(
    player = null
) {

    document
        .getElementById(
            "playerModal"
        )
        .classList.add("open");


    const title =
        document.getElementById(
            "playerModalTitle"
        );


    if (player) {

        title.textContent =
            "EDIT PLAYER";


        document
            .getElementById("playerId")
            .value = player.id;

        document
            .getElementById("playerNickname")
            .value = player.nickname;

        document
            .getElementById("playerRank")
            .value = player.rank;

        document
            .getElementById("playerRole")
            .value = player.role;

        document
            .getElementById("playerLevel")
            .value = player.level;

        document
            .getElementById("playerActivity")
            .value = player.activity;

        document
            .getElementById("playerStatus")
            .value = player.status;

        document
            .getElementById("playerDescription")
            .value =
                player.description || "";

    } else {

        title.textContent =
            "ADD PLAYER";


        document
            .getElementById(
                "playerForm"
            )
            .reset();


        document
            .getElementById(
                "playerId"
            )
            .value = "";

    }

}


function editPlayer(id) {

    const roster =
        getRoster();


    const player =
        roster.find(
            item => item.id === id
        );


    if (!player) return;


    openPlayerModal(
        player
    );

}


/* =========================================================
   SAVE PLAYER
========================================================= */

function setupPlayerForm() {

    document
        .getElementById(
            "playerForm"
        )
        ?.addEventListener(
            "submit",
            savePlayer
        );

}


function savePlayer(event) {

    event.preventDefault();


    const roster =
        getRoster();


    const id =
        document
            .getElementById(
                "playerId"
            )
            .value;


    const player = {

        id:
            id ||
            "yz-" + Date.now(),

        nickname:
            document
                .getElementById(
                    "playerNickname"
                )
                .value
                .trim(),

        rank:
            document
                .getElementById(
                    "playerRank"
                )
                .value,

        role:
            document
                .getElementById(
                    "playerRole"
                )
                .value,

        level:
            document
                .getElementById(
                    "playerLevel"
                )
                .value
                .trim(),

        activity:
            document
                .getElementById(
                    "playerActivity"
                )
                .value
                .trim(),

        status:
            document
                .getElementById(
                    "playerStatus"
                )
                .value,

        description:
            document
                .getElementById(
                    "playerDescription"
                )
                .value
                .trim()

    };


    if (id) {

        const index =
            roster.findIndex(
                item =>
                    item.id === id
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

function deletePlayer(id) {

    const roster =
        getRoster();


    const player =
        roster.find(
            item => item.id === id
        );


    if (!player) return;


    if (
        !confirm(
            `Удалить ${player.nickname} из состава YZ?`
        )
    ) {
        return;
    }


    const updated =
        roster.filter(
            item => item.id !== id
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

function openModal(id) {

    document
        .getElementById(id)
        ?.classList.add("open");

}


function closeModal(id) {

    document
        .getElementById(id)
        ?.classList.remove("open");

}


/* Close modal by clicking background */

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
   HELPERS
========================================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            value;

    }

}


function getInitials(
    nickname
) {

    if (!nickname) {
        return "YZ";
    }


    const clean =
        nickname
            .trim()
            .replace(/[^a-zA-Zа-яА-Я0-9]/g, "");


    return clean
        .slice(0, 2)
        .toUpperCase();

}


function escapeHtml(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }


    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}