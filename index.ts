import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import MyChartComponent from "./ColumnChart";

export class ColumnChartComponent implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container: HTMLDivElement;
    private _context: ComponentFramework.Context<IInputs>;
    private varInput: { name: string; Score: number }[];
    private Customheight: number;
    private Customwidth: number;
    private CustomColor: string;

    constructor() {
        this.varInput = [];
    }

    private updateInputData(context: ComponentFramework.Context<IInputs>): void {
        if (typeof context.parameters.Items.raw === 'string') {
            this.varInput = context.parameters.Items.raw.split(',').map(item => {
                const [name, total] = item.split('+').map(part => part.trim());
                return { name, Score: parseFloat(total) };
            });
        } else {
            this.varInput = [];
        }

        this.Customheight = context.parameters.CustomHeight.raw || 600;
        this.Customwidth = context.parameters.CustomWidth.raw || 400;
        this.CustomColor = context.parameters.CustomColor.raw || "#0000FF";
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this._container = container;
        this._context = context;
        this.updateInputData(context);
        this.renderComponent();
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this._context = context;
        this.updateInputData(context);
        this.renderComponent();
    }

    private renderComponent(): void {
        ReactDOM.render(
            React.createElement(MyChartComponent, { data: this.varInput, customHeight: this.Customheight, customWidth: this.Customwidth, customColor: this.CustomColor }),
            this._container
        );
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        ReactDOM.unmountComponentAtNode(this._container);
    }
}