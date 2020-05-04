import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  SIDE_BAR,
  STAR_WAR_CHARACTERS,
  FILMS,
  PLANETS,
  SPECIES,
  STARSHIPS,
} from "src/app/core/constants/json.constant";
import { DataPassService } from "src/app/shared/shared/data-pass.service";
import { StorageService } from "src/app/core/services/storage.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  @ViewChild("myProfileText") myProfileText: ElementRef;
  @ViewChild("showProfile") showProfile: ElementRef;
  showMyContainer = false;
  searchText;
  sideNavbar = false;
  sideBarList = SIDE_BAR;
  selectedList = STAR_WAR_CHARACTERS;
  selectedName: string;
  selectedView = "table";

  constructor(
    private route: ActivatedRoute,
    private dataService: DataPassService,
    private storageService: StorageService
  ) {
    let selectedInfo = this.storageService.getItem("selectedInfo");
    // if (selectedInfo) {
    this.getLink(selectedInfo);
    this.dataService.dataPass$.next(selectedInfo);
    // }
  }

  ngOnInit(): void { }

  // toggle side bar
  openNav() {
    this.sideNavbar = !this.sideNavbar;
  }
  // based on the user selection assign data
  getLink(data) {
    if (data) {
      this.selectedName = data.name;
      if (data.name === "characters") {
        this.selectedList = STAR_WAR_CHARACTERS;
      } else if (data.name === "films") {
        this.selectedList = FILMS;
      } else if (data.name === "planets") {
        this.selectedList = PLANETS;
      } else if (data.name === "species") {
        this.selectedList = SPECIES;
      } else if (data.name === "starships") {
        this.selectedList = STARSHIPS;
      }
    } else {
      data = { name: "characters", logo: "fa fa-user" }
      this.selectedName = data.name;
    }
    this.storageService.setItem("selectedInfo", data);
    this.dataService.dataPass$.next(data);
  }

  // to switch between table or chart view
  viewChange(data) {
    if (data) {
      this.selectedView = data;
    }
  }

  // to filter the text
  filterText(e) {
    let filterData = e.target.value;
    console.log(filterData);
    this.dataService.searchDataPass$.next(filterData);
  }
}
