//Interface de modelo que contém os atributos de ferramentas
export interface Tool{
    idTool?: number;
    title: String;
    link: String;
    description: String;
    tags: string[];
}