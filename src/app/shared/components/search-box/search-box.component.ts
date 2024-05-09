import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { CountriesService } from '../../../countries/services/country.service';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  constructor (private countryService: CountriesService) {}
  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;
  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = this.countryService.cacheStore.byCapital.term ;

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();


  ngOnInit(): void {
   this.debouncer
   .pipe(
    debounceTime(300)
   )
   .subscribe(
    value => {
      this.onDebounce.emit(value);
    }
   )
  }


  emitValue (term : string ) {
    this.onValue.emit(term);
  }

  onKeyPressed(searchTerm: string){
    this.debouncer.next(searchTerm);

  }



}
