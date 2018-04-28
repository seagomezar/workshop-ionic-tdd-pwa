import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { AddHoldingPage } from "./add-holding";
import { IonicModule, NavController, NavParams } from "ionic-angular";
import { NavMock, HoldingsProviderMock } from "../../../test-config/mocks-ionic";
import { HoldingsProvider } from "../../providers/holdings/holdings";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('Home Page', function() {

    let comp: AddHoldingPage;
    let fixture: ComponentFixture<AddHoldingPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddHoldingPage],
            providers: [
                {
                    provide: NavController,
                    useClass: NavMock
                },
                {
                    provide: NavParams,
                    useClass: NavMock
                },
                {
                    provide: HoldingsProvider,
                    useClass: HoldingsProviderMock
                }
            ],
            imports: [
                IonicModule.forRoot(AddHoldingPage)
            ]
        }).compileComponents();
    }));

    beforeEach(()=>{
        fixture = TestBed.createComponent(AddHoldingPage);
        comp = fixture.componentInstance;
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('El componente add holding debe crearse', () => {
        expect(comp).toBeDefined();
    });
    it('Debería llamarse a verify holdings y a addHoldings en el provider', () => {
        spyOn(comp.holdingsProvider, 'verifyHoldings').and.returnValue(Observable.of({ success: true}));
        spyOn(comp.holdingsProvider, 'addHolding').and.returnValue(Observable.of({ success: true}));
        comp.cryptoCode = 'BTC';
        comp.displayCurrency = 'USD';
        comp.amountHolding = 10;

        const holding = {
            crypto: comp.cryptoCode,
            currency: comp.displayCurrency,
            amount: comp.amountHolding
        }
        comp.addHolding();
        expect(comp.holdingsProvider.verifyHoldings).toHaveBeenCalledWith(holding);
        expect(comp.holdingsProvider.addHolding).toHaveBeenCalledWith(holding);
    });

    it('Debería llamarse a verify holdings y no addHoldings en el provider', () => {
        spyOn(comp.holdingsProvider, 'verifyHoldings').and.returnValue(Observable.of({ success: false}));
        spyOn(comp.holdingsProvider, 'addHolding');
        comp.cryptoCode = 'BTC';
        comp.displayCurrency = 'USD';
        comp.amountHolding = 10;

        const holding = {
            crypto: comp.cryptoCode,
            currency: comp.displayCurrency,
            amount: comp.amountHolding
        };
        
        comp.addHolding();
        expect(comp.holdingsProvider.verifyHoldings).toHaveBeenCalledWith(holding);
        expect(comp.holdingsProvider.addHolding).not.toHaveBeenCalled();
    });

    it('Debería no estar la connexión disponible', () => {
        spyOn(comp.holdingsProvider, 'verifyHoldings').and.returnValue(Observable.throw('Error'));
        comp.cryptoCode = 'BTC';
        comp.displayCurrency = 'USD';
        comp.amountHolding = 0;

        const holding = {
            crypto: comp.cryptoCode,
            currency: comp.displayCurrency,
            amount: comp.amountHolding
        }
        comp.addHolding();
        expect(comp.noConnection).toBe(true);
    }); 

});