import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-redeem-points',
  templateUrl: './redeem-points.component.html',
  styleUrls: ['./redeem-points.component.css']
})
export class RedeemPointsComponent implements OnInit {

  listOfAllRedemptionItems: Array<any> = [];
  listOfRedemptionItemsInShoppingCart: Array<any> = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.refreshListOfAvailableRedemptionItems();
  }

  // Retrieve All
  refreshListOfAvailableRedemptionItems() {
    this.http.get('api/redemptionItems').subscribe(data => {
      this.listOfAllRedemptionItems = data as Array<any>;
    });
  }

  // Add Item To Shopping Cart
  addToShoppingCart(redemptionItem) {
    this.listOfRedemptionItemsInShoppingCart.push(redemptionItem);
  }

  // Get Total Cost
  getTotalCostInPointsOfShoppingCart(){
    var totalCostInPoints = 0;

    for(var i = 0;i<this.listOfRedemptionItemsInShoppingCart.length;i++) { 
      totalCostInPoints += Number(this.listOfRedemptionItemsInShoppingCart[i].costInPoints); 
   }

    return totalCostInPoints;
  }
}
