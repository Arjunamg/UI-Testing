import { Selector, t } from "testcafe";
export default class Movement {
    constructor() {
        this.forwardPaperPlane = Selector('.fa.fa-paper-plane.fa-2x.fa-1x.fa');
        this.forwardItemPaperPlane = Selector('.icon').find('.fas.m-r-5.fa.fa-paper-plane');
        this.backwardPaperPlane = Selector('[class^="fa fa-paper-plane fa-flip-horizontal fa-2x fa-1x f"]');
        this.backwardItemPaperPlane = Selector('.fas.m-r-5.fa.fa-paper-plane.fa-flip-horizontal');
        this.selectAllItems = Selector('[class^="vuetable-th-component-checkbox vuetable-th-compone"]').find('input');
        this.modalMove = Selector('a').withText('MOVE');
        this.stageDD = Selector('.multiselect__single').nth(2)
        this.stagePrep =Selector('span').withText('Preparation').nth(1)
        this.stageFM =Selector('span').withText('Field Measurement').nth(1)
        this.stageOrdering =Selector('span').withText('Ordering').nth(1)
        this.PoName = Selector('div').withText('Name').nth(19).find('.input')
        this.poToPrefabConfirm = Selector('button').withText('Yes')
        this.poToDetailingDateSelect =  Selector('.control.has-icons-left.is-clearfix').find('.input')
        this.poToDetailingDate = Selector('.datepicker-row').nth(38).find('a').withText('15')
        this.poToDetailingLocSelect = Selector('.multiselect').nth(8).find('div').withText('Select One')
        this.poToDetailingLoc = Selector('li').withText('Name').nth(7).find('.multiselect__option.multiselect__option--highlight')
        this.DetailingToManufDateSelect = Selector('.control.has-icons-left.is-clearfix').find('.input')
        this.DetailingToManufDate = Selector('.datepicker-row').nth(75).find('a').withText('18')
        this.manufToQaDateSelect = Selector('.control.has-icons-left.is-clearfix').find('.input')
        this.manufToQaDate = Selector('.datepicker-row').nth(75).find('a').withText('18')
        //Below are the Shipping selectors which might be useful later.
        // this.shipButton = Selector('.fa.fa-truck.fa-2x.fa-1x.fa');
        // this.shipItemButton = Selector('.fas.m-r-5.fa.fa-truck');
        // this.shipNext = Selector('button').withText('Next');
        // this.shipOrderName = Selector('div').withText('Name').nth(37).find('.input');
        // this.shipID = Selector('div').withText('Tracking').nth(10).find('.input');
        // this.shipDateField = Selector('.control.has-icons-left.is-clearfix').find('.input');
        // this.deliverDateField = Selector('div').withText('Delivery Location').nth(17).find('.input');
        // this.deliveryLocationField = Selector('div').withText('Delivery Location').nth(17).find('.multiselect__single');
        // this.shipCreate = Selector('button').withText('Create');
    }

    //Material Movement is ONLY from P->FM->O or O->FM->P
    async movement(kind,stage,poName){
        if(kind==='forward'){
            await this.forward(stage,poName);
        }
        else if(kind==='backward'){
            await this.backward(stage);
        }
    }
    async selectAllMove(reqItemCheck){
        if(reqItemCheck) await t.click(this.selectAllItems);
            await t.click(this.modalMove)
    }
    async forwardMove(){
        await t
            .click(this.forwardPaperPlane)
            .click(this.forwardItemPaperPlane)
    }
    async backwardMove(){
        await t
            .click(this.backwardPaperPlane)
            .click(this.backwardItemPaperPlane)
    }
    //Pass Detination names as stage name
    async forward(stage,poName){
        if(stage==='FM'){
            await this.forwardMove();
            await t  
                .click(this.stageDD)
                .click(this.stageFM);
            await this.selectAllMove(true);
        }
        else if(stage==='Ordering'){
            await this.forwardMove();
            await this.selectAllMove(true);
        }
        else if(stage === 'PO'){
            await this.forwardMove();
            await t 
                .click(this.PoName)
                .typeText(this.PoName, poName)
            await this.selectAllMove(true);
        }
        else if(stage === 'Detailing'){
            await this.forwardMove();
            await t 
                .click(this.poToDetailingDateSelect)
                .click(this.poToDetailingDate)
                .click(this.poToDetailingLocSelect)
                .click(this.poToDetailingLoc)
            await this.selectAllMove(false);
        }
        else if(stage === 'Manufacturing'){
            await this.forwardMove();
            await t 
                .click(this.DetailingToManufDateSelect)
                .click(this.DetailingToManufDate)
            await this.selectAllMove(true);
        }
        else if(stage ==='QA'){
            await this.forwardMove();    
            await t
                .click(this.DetailingToManufDateSelect)
                .click(this.manufToQaDate)
            await this.selectAllMove(true);
            
        }
    }
    async backward(){
        if(stage==='Preparation'){
            await this.backwardMove(); 
            await this.selectAllMove();        
        }
        else if(stage==='FM'){
            await this.backwardMove(); 
            await t  
                .click(this.stageDD)
                .click(this.stageFM)
            await this.selectAllMove();
        }
        else if(stage==='Prefab'){
            await this.backwardMove(); 
            await t
                .click(this.poToPrefabConfirm)
        }
        else if(stage==='PO'){
            await this.backwardMove(); 
            await t 
                .click(this.modalMove)
        }
        else if(stage==='Detailing'){
            await this.backwardMove(); 
            await t
                .click(this.modalMove)
        }
        else if(stage==='Manufacturing'){
            await this.backwardMove(); 
            await this.selectAllMove();
        }
    }
}