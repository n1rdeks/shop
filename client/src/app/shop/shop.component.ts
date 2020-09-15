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
    @ViewChild('search', {static: false}) searchTerm: ElementRef;
    products: IProduct[];
    brands: IProductBrand[];
    types: IProductType[];
    totalCount: number;
    shopParams: ShopParams;
    sortOptions = [
        {name: 'Alphabetical', value: 'name'},
        {name: 'Low to High', value: 'priceAsc'},
        {name: 'High to Low', value: 'priceDesc'},
    ];

    constructor(private shopService: ShopService) {
        this.shopParams = this.shopService.getShopParams();
    }

    ngOnInit(): void {
        this.getProducts(true);
        this.getBrands();
        this.getTypes();
    }

    getProducts(useCache = false) {
        this.shopService.getProducts(useCache)
            .subscribe(response => {
                this.products = response.data;
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
        const params = this.shopService.getShopParams();

        // ------- I clear search, if using brand filter
        // if needed use filter on search term - just remove this lines
        this.searchTerm.nativeElement.value = '';
        this.shopParams.search = '';
        // -------

        params.brandId = brandId;
        // Reset page
        params.pageNumber = 1;
        this.shopService.setShopParams(params);
        this.getProducts();
    }

    onTypeSelected(typeId: number) {
        const params = this.shopService.getShopParams();

        // ------- I clear search, if using type filter
        // if needed use filter on search term - just remove this lines
        this.searchTerm.nativeElement.value = '';
        this.shopParams.search = '';
        // -------

        params.typeId = typeId;
        // Reset page
        params.pageNumber = 1;
        this.shopService.setShopParams(params);
        this.getProducts();
    }

    onSortSelected(sort: string) {
        const params = this.shopService.getShopParams();
        params.sort  = sort;
        this.shopService.setShopParams(params);
        this.getProducts();
    }

    onPageChanged(event: any) {
        const params = this.shopService.getShopParams();

        if (params.pageNumber !== event) {
            params.pageNumber = event;
            this.shopService.setShopParams(params);
            this.getProducts(true);
        }
    }

    onSearch() {
        const params = this.shopService.getShopParams();
        params.search = this.searchTerm.nativeElement.value;
        params.pageNumber = 1;
        this.shopService.setShopParams(params);
        this.getProducts();
    }

    onReset() {
        this.searchTerm.nativeElement.value = '';
        this.shopParams = new ShopParams();
        this.shopService.setShopParams(this.shopParams);
        this.getProducts();
    }
}
