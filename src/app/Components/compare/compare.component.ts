import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
// @ts-ignore
import {IListBoxItem, IItemsMovedEvent} from '../dual-list-box';
import {moveItemInArray, CdkDragDrop, transferArrayItem} from '@angular/cdk/drag-drop';
import {FormGroup, FormBuilder} from '@angular/forms';
import {toInteger} from '@ng-bootstrap/ng-bootstrap/util/util';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../_common-services/base-service/base.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  name = 'Angular';
  data: boolean;
  logos;
  currentSelectItems: any[] = [];
  rating;
  logoSelected: any;
  availableLeft: boolean;
  availableRight: boolean;
  ratingsLeft;
  ratingsRight;
  availableItems: Array<IListBoxItem> = [];
  selectedItems: Array<IListBoxItem> = [];
  selectedItems2: Array<IListBoxItem> = [];
  listBoxForm: FormGroup;
  modelDataContainerLeft;
  modelDataContainerRight;
  cardOneTrigger;
  cardTwoTrigger;
  counterLeft = 0;
  counterRight = 0;
  loader: boolean;
  private logoData: boolean;
  ngOnInit() {

    this.getBrandLogo();
    this.loader = true;
  }

  onItemsMoved(event): void {
    this.currentSelectItems = event.selected;
  }

  // array of items to display in left box
  @Input() set availables(items: Array<{}>) {
    this.availableItems = [...(items || []).map((item: {}, index: number) => ({
      value: item[this.valueField].toString(),
      text: item[this.textField],
      url: item[this.url],
      image: item[this.image]
    }))];
  }

  // array of items to display in right box
  @Input() set selects(items: Array<{}>) {
    this.selectedItems = [...(items || []).map((item: {}, index: number) => ({
      value: item[this.valueField].toString(),
      text: item[this.textField],
      url: item[this.url],
      poster: item[this.image]
    }))];
  }

  @Input() set select2(items: Array<{}>) {
    this.selectedItems2 = [...(items || []).map((item: {}, index: number) => ({
      value: item[this.valueField].toString(),
      text: item[this.textField],
      url: item[this.url],
      poster: item[this.image]
    }))];
  }

  // field to use for value of option
  @Input() valueField = 'id';
  // field to use for displaying option text
  @Input() textField = 'model';
  @Input() url = 'url';
  @Input() image = 'image';
  // text displayed over the available items list box
  @Input() availableText = 'Select a Brand to view the Available Models';
  // text displayed over the selected items list box
  @Input() selectedText = 'Selected items';
  // set placeholder text in available items list box
  @Input() availableFilterPlaceholder = 'Filter...';
  // set placeholder text in selected items list box
  @Input() selectedFilterPlaceholder = 'Filter...';

  // event called when items are moved between boxes, returns state of both boxes and item moved
  @Output() itemsMoved: EventEmitter<IItemsMovedEvent> = new EventEmitter<IItemsMovedEvent>();



  constructor(public fb: FormBuilder, private service: BaseService) {

    this.listBoxForm = this.fb.group({
      availableSearchInput: [''],
      selectedSearchInput: [''],
    });
  }

  drop(event: CdkDragDrop<IListBoxItem[]>, card) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('Dropped', this.counterLeft, this.counterRight);
      if(this.counterLeft === 0 || this.counterRight === 0 ){
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        if (card === 'card1') {
          this.cardOneTrigger = true;
          this.counterLeft = this.counterLeft + 1;
          const data = this.selectedItems2[0];
          this.service.getSelectedModelInfo(data.brand, data.model)
            .subscribe((response) => {
              this.modelDataContainerLeft = response;
              // To prevent from one array being null trigger is used so that after both the array has data the loop starts
              if(this.cardTwoTrigger === true){
                this.data = true;
              }else{
                this.data=false;
              }
              console.log('Left', this.modelDataContainerLeft);
              const mapped = Object.keys(response).map(key => ({type: key, value: response[key]}));
              if(mapped[0].value[0].abs === 'Yes'){
                this.availableLeft = true;
              } else{
                this.availableLeft = false;
              }
              this.ratingsLeft = this.calculateRating(mapped[0].value[0].ratings);
            });

        }
        else if(card =='card2') {
          this.cardTwoTrigger = true;
          this.counterRight = this.counterRight + 1;
          const data = this.selectedItems[0];
          this.service.getSelectedModelInfo(data.brand, data.model)
            .subscribe((response) => {
              this.modelDataContainerRight = response;
              if(this.cardOneTrigger === true){
                this.data = true;
              }else{
                this.data = false;
              }
              console.log('Right',this.modelDataContainerRight);
              const mapped = Object.keys(response).map(key => ({type: key, value: response[key]}));
              if(mapped[0].value[0].abs === 'Yes' ){
                this.availableRight = true;
              } else{
                this.availableRight = false;
              }
              this.ratingsRight = this.calculateRating(mapped[0].value[0].ratings);
            });

        }
        if (this.selectedItems.length > 0 && this.selectedItems2.length > 0) {
          window.scroll({
            top: 80,
            left: 0,
            behavior: 'smooth'
          });
          document.getElementById('content').scrollIntoView({
            behavior: 'smooth'
          });
        } else {
          this.data = false;
        }
      }else{

        console.log('More Than one');
      }


    }

    this.itemsMoved.emit({
      available: this.availableItems,
      selected: this.selectedItems,
      selected2: this.selectedItems2,
      movedItems: event.container.data.filter((v, i) => i === event.currentIndex),
      from: 'available',
      to: ['selected', 'selected2'],
    });
  }

  selectedLogo(item: any) {
    console.log(item);
    this.logoSelected = true;
    this.availableText = 'Available Models';
    this.service.getAvailableCarModels()
      .subscribe((response) => {
        const values = Object.keys(response).map(it => response[it]);
        this.availableItems = values;
        const test = [];
        test.push(this.availableItems[0].filter((data) => {
          return data.brand === item.brand;
        }));
        this.availableItems = test[0];
      });


  }

  calculateRating(stars) {
    // @ts-ignore
    return Array(toInteger(stars)).fill().map((x, i) => i);
  }

  getBrandLogo() {
    this.service.getBrandLogo()
      .subscribe((response) => {
        this.logos = response;
        this.logoData = true;
        this.loader = false;
      },error => {
        this.loader = true;
        setTimeout(()=>{
          this.logoData = false;
          this.loader = false;
        },3000);
      });
  }

  reload() {
    this.modelDataContainerLeft = [];
    this.modelDataContainerRight =[];
    this.selectedItems2 =[];
    this.selectedItems =[];
    this.counterRight =0;
    this.counterLeft =0;
    this.data = false;
    this.cardOneTrigger =false;
    this.cardTwoTrigger = false;

  }
}
