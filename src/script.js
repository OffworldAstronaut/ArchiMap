const map = L.map("map").setView([-9.6498, -35.7089], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      // Define custom icons by type
      const markerIcons = {
        matriz: new L.Icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
        comunidade: new L.Icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
        capela: new L.Icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
        catedral: new L.Icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        }),
        default: new L.Icon.Default(),
      };

      function updateInfoBox(parish) {
        const infoBox = document.getElementById("parish-details");
        infoBox.innerHTML = `
          <h4>⛪ ${parish.name}</h4>
          ${
            ["comunidade", "capela"].includes(parish.type) &&
            parish.subdivision_of
              ? `<p class="subdivision"><strong>⛪ Subdivisão de:</strong> ${parish.subdivision_of}</p>`
              : ""
          }
          <p><strong>📍 Endereço:</strong> ${
            parish.address || "Não disponível"
          }</p>
          <p><strong>✝️ Pároco:</strong> ${parish.priest || "Não informado"}</p>
          <p><strong>☎️ Telefone:</strong> ${
            parish.contact?.phone || "Não informado"
          }</p>
          <p><strong>📬 Email:</strong> ${
            parish.contact?.email || "Não informado"
          }</p>
          <p><strong>📸 Instagram:</strong> ${
            parish.contact?.instagram || "Não informado"
          }</p>
          ${
            parish.schedule?.masses
              ? `<p><strong>⏰ Missas</strong><br>${parish.schedule.masses.join(
                  "<br>"
                )}</p>`
              : ""
          }
          ${(() => {
            const conf = parish.schedule?.confessions;
            if (Array.isArray(conf)) {
              return `<p><strong>⏰ Confissões</strong><br>${conf.join(
                "<br>"
              )}</p>`;
            } else if (typeof conf === "string" && conf.trim() !== "") {
              return `<p><strong>⏰ Confissões</strong><br>${conf}</p>`;
            } else {
              return "";
            }
          })()}
          ${
            parish.schedule?.events
              ? `<p><strong>⏰ Eventos</strong><br>${parish.schedule.events.join(
                  "<br>"
                )}</p>`
              : ""
          }
        `;
      }

      fetch("../data/parishes.json")
        .then((response) => response.json())
        .then((data) => {
          data.parishes.forEach((parish) => {
            const icon =
              markerIcons[parish.type?.toLowerCase()] || markerIcons.default;

            const marker = L.marker(
              [parish.location.lat, parish.location.lng],
              { icon }
            ).addTo(map);

            marker.bindPopup(`<strong>${parish.name}</strong>`);
            marker.on("click", () => updateInfoBox(parish));
          });
        })
        .catch((error) => {
          console.error("Erro ao carregar os dados das paróquias:", error);
        });

      const darkModeToggle = document.getElementById("bdarklight");

      function applyMapDarkMode(enabled) {
        const selectors = [
          ".leaflet-layer",
          ".leaflet-control-zoom-in",
          ".leaflet-control-zoom-out",
          ".leaflet-control-attribution",
        ];

        selectors.forEach((selector) => {
          document.querySelectorAll(selector).forEach((el) => {
            if (enabled) {
              el.classList.add("dark");
            } else {
              el.classList.remove("dark");
            }
          });
        });
      }

      darkModeToggle.addEventListener("click", () => {
        const body = document.body;
        const isDark = body.classList.toggle("dark");

        darkModeToggle.textContent = isDark ? "Trevas" : "Luz";
        applyMapDarkMode(isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
      });

      // On page load, apply saved theme
      window.addEventListener("DOMContentLoaded", () => {
        const savedTheme = localStorage.getItem("theme");
        const isDark = savedTheme === "dark";
        if (isDark) {
          document.body.classList.add("dark");
          darkModeToggle.textContent = "Trevas";
        }
        applyMapDarkMode(isDark);
      });