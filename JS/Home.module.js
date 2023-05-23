import { Details } from "./Details.module.js"
import { Ui } from "./Ui.module.js"

export class Home {
  constructor () {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", ()=> {
      this.changeActiveLink(link)
      const category = link.getAttribute("data-category")
      // console.log(category);
      this.getGame(category)
    })
  })
  this.loading = document.querySelector(".loading")
  this.details = document.getElementById("details")
  this.games = document.getElementById("games")

  this.ui = new Ui()
  this.getGame("mmorpg")
  }

  async changeActiveLink(link) {
      document.querySelector(".navbar-nav .active").classList.remove("active")
      link.classList.add("active")
  }

  async getGame(categury) {
    this.loading.classList.replace("d-none","d-flex")
    const options = {
      method : "GET",
      headers : {
        'X-RapidAPI-Key': '3ad6279c33mshec8a7988cca0bb2p165e34jsn69dc102e0ee1',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    }

    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categury}`, options)
    const res = await api.json()
    this.loading.classList.add("d-none")
    console.log(res);
    this.ui.displaygames(res)
    document.querySelectorAll(".card").forEach(card => {
      card.addEventListener("click", () => {
        this.details.classList.remove("d-none")
        this.games.classList.add("d-none")
        new Details(card.dataset.id)
      })
    })
  }
}