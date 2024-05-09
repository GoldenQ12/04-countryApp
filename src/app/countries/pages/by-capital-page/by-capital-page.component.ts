import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/country.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {


  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';


  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }






  private apiUrl: string  = 'https://restcountries.com/v3.1'

  constructor (private countriesService : CountriesService) { }

  public searchByCapital ( term : string ): void{

    this.isLoading = true;

    this.countriesService.searchCapital(term)
    .subscribe( countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }


}
