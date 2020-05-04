import { Component, OnInit, Input } from "@angular/core";
import {
  STAR_WAR_CHARACTERS,
  PLANETS,
  SPECIES,
  CHARACTER_KEYS,
  PLANET_KEYS,
  SPECIES_KEYS,
  FILMS,
  STARSHIPS,
  STAR_SHIPS_KEYS,
  FILMS_KEYS,
} from "../../../../core/constants/json.constant";
import { DataPassService } from "src/app/shared/shared/data-pass.service";
import { StorageService } from "src/app/core/services/storage.service";

@Component({
  selector: "app-table-view",
  templateUrl: "./table-view.component.html",
  styleUrls: ["./table-view.component.scss"],
})
export class TableViewComponent implements OnInit {
  selectedInfo;
  displayList;
  keysList;
  character_keys = CHARACTER_KEYS;
  planet_keys = PLANET_KEYS;
  species_keys = SPECIES_KEYS;
  star_ships_keys = STAR_SHIPS_KEYS;
  films_keys = FILMS_KEYS;
  searchText;
  paginationValue = 0;
  count;
  totalCount;
  pageCountList = [];
  constructor(
    private dataService: DataPassService,
    private storageService: StorageService
  ) {
    // subscribe the filter text
    this.dataService.searchDataPass$.subscribe((data) => {
      if (data) {
        this.searchText = data;
      }
    });
    // subscribe the type of user selection
    this.dataService.dataPass$.subscribe((data) => {
      if (data) {
        this.selectedInfo = data;
        if (this.selectedInfo) {
          this.setData(this.selectedInfo);
        }
      } else {
        this.selectedInfo = this.storageService.getItem("selectedInfo");
        this.setData(this.selectedInfo);
      }
    });
  }

  ngOnInit(): void { }

  // based on the selction assign tables and data
  setData(selectedInfo) {
    if (selectedInfo.name === "characters") {
      this.displayList = STAR_WAR_CHARACTERS.dataView.rows;
      this.keysList = this.character_keys;
    } else if (selectedInfo.name === "planets") {
      this.displayList = PLANETS.dataView.rows;
      this.keysList = this.planet_keys;
    } else if (selectedInfo.name === "species") {
      this.displayList = SPECIES.dataView.rows;
      this.keysList = this.species_keys;
    } else if (selectedInfo.name === "films") {
      this.displayList = FILMS.dataView.rows;
      this.keysList = this.films_keys;
    } else if (selectedInfo.name === "starships") {
      this.displayList = STARSHIPS.dataView.rows;
      this.keysList = this.star_ships_keys;
    }
    this.displayListByCount(this.paginationValue);
    this.storageService.setItem("selectedInfo", selectedInfo);
  }
  displayListByCount(count) {
    if (count !== 0) {
      count = count * 10;
    }
    this.pageCountList = [];
    for (let i = count; i < count + 10; i++) {
      if (this.displayList[i]) {
        this.pageCountList.push(this.displayList[i])
      }
    }
  }
  previousClick() {
    if (this.paginationValue > 0) {
      this.paginationValue--;
      this.displayListByCount(this.paginationValue);
    }
  }

  nextClick() {
    if (Math.floor(this.displayList.length / 10) > this.paginationValue) {
      this.paginationValue++;
      this.displayListByCount(this.paginationValue);
    }

  }

  firstClick() {
    this.paginationValue = 0;
    this.displayListByCount(this.paginationValue);
  }

  lastClick() {
    this.count = this.displayList.length / 10;
    this.paginationValue = Math.floor(this.count);
    console.log(this.paginationValue, this.count);

    this.displayListByCount(this.paginationValue);
  }
}
