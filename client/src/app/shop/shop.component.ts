import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopService } from './shop.service';
import { IProductBrand } from '../shared/models/productBrand';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';


@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
    @ViewChild('search', {static: true}) searchTerm: ElementRef;
    products: IProduct[];
    brands: IProductBrand[];
    types: IProductType[];
    totalCount: number;
    shopParams = new ShopParams();
    sortOptions = [
        {name: 'Alphabetical', value: 'name'},
        {name: 'Low to High', value: 'priceAsc'},
        {name: 'High to Low', value: 'priceDesc'},
    ];

    constructor(private shopService: ShopService) { }

    ngOnInit(): void {
        this.getProducts();
        this.getBrands();
        this.getTypes();
    }

    getProducts() {
        this.shopService.getProducts(this.shopParams)
            .subscribe(response => {
                this.products = response.data;
                this.shopParams.pageNumber = response.pageIndex;
                this.shopParams.pageSize = response.pageSize;
                this.totalCount = response.count;
            }, error => {
                console.log(error);
            });
    }

    getBrands() {
        this.shopService.getBrands().subscribe(response => {
            this.brands = [{id: 0, name: 'All'}, ...response];
        }, error => {
            console.log(error);
        });
    }

    getTypes() {
        this.shopService.getTypes().subscribe(response => {
           this.types = [{id: 0, name: 'All'}, ...response];
        }, error => {
            console.log(error);
        });
    }

    onBrandSelected(brandId: number) {
        // ------- I clear search, if using brand filter
        // if needed use filter on search term - just remove this lines
        this.searchTerm.nativeElement.value = '';
        this.shopParams.search = '';
        // -------

        this.shopParams.brandId = brandId;
        // Reset page
        this.shopParams.pageNumber = 1;
        this.getProducts();
    }

    onTypeSelected(typeId: number) {
        // ------- I clear search, if using type filter
        // if needed use filter on search term - just remove this lines
        this.searchTerm.nativeElement.value = '';
        this.shopParams.search = '';
        // -------

        this.shopParams.typeId = typeId;
        // Reset page
        this.shopParams.pageNumber = 1;
        this.getProducts();
    }

    onSortSelected(sort: string) {
        this.shopParams.sort  = sort;
        this.getProducts();
    }

    onPageChanged(event: any) {
        if (this.shopParams.pageNumber !== event) {
            this.shopParams.pageNumber = event;
            this.getProducts();
        }
    }

    onSearch() {
        this.shopParams.search = this.searchTerm.nativeElement.value;
        this.getProducts();
    }

    onReset() {
        this.searchTerm.nativeElement.value = '';
        this.shopParams = new ShopParams();
        this.getProducts();
    }
}
