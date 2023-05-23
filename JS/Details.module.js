import { Ui } from "./Ui.module.js";

export class Details {
  constructor (id) {
    document.getElementById("btnClose").addEventListener("click", () => {
      document.getElementById('details').classList.add("d-none")
      document.getElementById('games').classList.remove("d-none")
    })
    this.loading = document.querySelector(".loading")
    this.getDetails(id)
  }

  async getDetails(id) {
    this.loading.classList.replace("d-none", "d-flex")
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3ad6279c33mshec8a7988cca0bb2p165e34jsn69dc102e0ee1',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options)
    const response = await api.json()
    this.loading.classList.add("d-none")
    // console.log(response);
    new Ui().displayDetails(response)
  }
} 