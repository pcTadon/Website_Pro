document.addEventListener("DOMContentLoaded", () => {
    console.log("Bienvenue sur mon portfolio !");
    
    // Mise à jour automatique de l'année
    document.getElementById("year").textContent = new Date().getFullYear();
    
    // Affichage de l'heure en temps réel
    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        document.getElementById("current-time").textContent = `${hours}:${minutes}`;
    }
    setInterval(updateTime, 1000);
    updateTime();
    
    // Bouton interactif
    document.getElementById("info-btn").addEventListener("click", () => {
        const infoText = document.getElementById("info-text");
        infoText.style.display = (infoText.style.display === "none") ? "block" : "none";
    });
    
    // Compteur de visites (stocké en localStorage)
    let visitCount = localStorage.getItem("visitCount") || 0;
    visitCount++;
    localStorage.setItem("visitCount", visitCount);
    document.getElementById("visit-count").textContent = visitCount;
    
    // Graphique des visites
    const ctx = document.getElementById("visitChart").getContext("2d");
    let visitData = JSON.parse(localStorage.getItem("visitData")) || [];
    visitData.push({ date: new Date().toLocaleDateString(), count: visitCount });
    localStorage.setItem("visitData", JSON.stringify(visitData));
    
    new Chart(ctx, {
        type: "line",
        data: {
            labels: visitData.map(v => v.date),
            datasets: [{
                label: "Visites",
                data: visitData.map(v => v.count),
                borderColor: "#007BFF",
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});