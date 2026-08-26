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