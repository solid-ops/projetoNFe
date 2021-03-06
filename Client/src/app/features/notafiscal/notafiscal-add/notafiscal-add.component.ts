import { DestinatarioService } from './../../destinatario/shared/destinatario.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotaFiscalService } from '../shared/notafiscal.service';
import { Router } from '@angular/router';
import { NotaFiscal, NotaFiscalDataCommand, NotaFiscalPatchCommand } from '../shared/notafiscal.model';
import { Observable } from 'rxjs/Observable';
import { EmitenteService } from '../../emitentes/shared/emitente.service';
import { TransportadorService } from '../../transportador/shared/transportador.service';
import { ProdutoService } from '../../produto/shared/produto.service';

@Component({
    templateUrl: './notafiscal-add.component.html',
})
export class NotaFiscalAddComponent implements OnInit {
    public title: string = 'Nova Nota Fiscal';
    public isLoading: boolean;
    public notafiscal: NotaFiscal;
    public data: any[];
    public delay: number = 300;
    public form: FormGroup = this.fb.group({
        id: ['', Validators.required],
        naturezaOperacao: ['', Validators.required],
        dataEntrada: ['', [Validators.required]],
        valorIpi: ['', [Validators.required]],
        valorIcms: ['', Validators.required],
        emitente: [null, Validators.required],
        transportador: [null, Validators.required],
        destinatario: [null, Validators.required],
        produto: [null, Validators.required],
        valorDoFrete: ['', Validators.required],
    });
    constructor(private service: NotaFiscalService,
        private fb: FormBuilder,
        private router: Router,
        private serviceEmitente: EmitenteService,
        private serviceTransportador: TransportadorService,
        private serviceDestinatario: DestinatarioService,
        private serviceProduto: ProdutoService ) { }

    public ngOnInit(): void {
        //
     }
     public onAutoCompleteChangeEmitente(value: string): any {
        Observable.of(value)
          .delay(this.delay)
          .switchMap((value: any, index: number) => this.serviceEmitente.getByName(value))
          .subscribe((response: any) => {
            this.data = response;
          });
      }
      public onAutoCompleteChangeTransportador(value: string): any {
        Observable.of(value)
          .delay(this.delay)
          .switchMap((value: any, index: number) => this.serviceTransportador.getByName(value))
          .subscribe((response: any) => {
            this.data = response;
          });
      }
      public onAutoCompleteChangeDestinatario(value: string): any {
        Observable.of(value)
          .delay(this.delay)
          .switchMap((value: any, index: number) => this.serviceDestinatario.getByName(value))
          .subscribe((response: any) => {
            this.data = response;
          });
      }
      public onAutoCompleteChangeProduto(value: string): any {
        Observable.of(value)
          .delay(this.delay)
          .switchMap((value: any, index: number) => this.serviceProduto.getByName(value))
          .subscribe((response: any) => {
            this.data = response;
          });
      }
    public submit(): void {
        this.isLoading = true;
        const notaFiscalAddCommand: NotaFiscalDataCommand = new NotaFiscalDataCommand(this.form.value);
        notaFiscalAddCommand.emitenteId = this.form.value.emitente.id;
        notaFiscalAddCommand.emitenteNome = this.form.value.emitente.emitenteNome;

        notaFiscalAddCommand.transportadorId = this.form.value.transportador.id;
        notaFiscalAddCommand.transportadorNome = this.form.value.transportador.transportadorNome;

        notaFiscalAddCommand.destinatarioId = this.form.value.destinatario.id;
        notaFiscalAddCommand.destinatarioNome = this.form.value.destinatario.destinatarioNome;

        notaFiscalAddCommand.produtoId = this.form.value.produto.id;
        notaFiscalAddCommand.produtoDescricao = this.form.value.produto.produtoDescricao;
        this.service.add(notaFiscalAddCommand)
        .take(1)
        .subscribe(() => {
            this.submitProduto();
            this.redirect();
            this.isLoading = false;
        });
    }

    public submitProduto(): void {
        // This.service.get(this.notafiscal.id).combineLatest;
        const notafiscalPatchCommand: NotaFiscalPatchCommand = new NotaFiscalPatchCommand(this.form.value);
        notafiscalPatchCommand.notafiscalId = this.notafiscal.id;
        notafiscalPatchCommand.produtoId = this.form.value.produto.id;
        notafiscalPatchCommand.produtoDescricao = this.form.value.produto.produtoDescricao;
        this.service.addProduto(notafiscalPatchCommand);
    }

    public redirect(): void {
        this.router.navigate(['./']);
    }
}
