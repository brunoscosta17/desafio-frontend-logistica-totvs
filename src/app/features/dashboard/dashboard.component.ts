import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { TableComponent } from '../../shared/components/table/table.component';
import { DeliveryProgressByNeighborhood } from '../../models/DeliveryProgressByNeighborhood.interface';
import { NumberDeliveries } from '../../models/NumberDeliveries.interface';
import { DeliveryProgressEachDriver } from '../../models/DeliveryProgressEachDriver.interface';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DeliveryService } from '../../services/delivery.service';

const deliveries = [
  {
    "id": "1",
    "documento": "01021",
    "motorista": {
      "nome": "Carlos Pereira"
    },
    "cliente_origem": {
      "nome": "Empresa ABC",
      "endereco": "Rua dos Pinheiros, 789",
      "bairro": "Jardins",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Ana Clara",
      "endereco": "Rua Vergueiro, 1234",
      "bairro": "Liberdade",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "ENTREGUE"
  },
  {
    "id": "2",
    "documento": "01022",
    "motorista": {
      "nome": "Carla Souza"
    },
    "cliente_origem": {
      "nome": "Empresa DEF",
      "endereco": "Rua Augusta, 345",
      "bairro": "Consola\u00e7\u00e3o",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Pedro Lima",
      "endereco": "Avenida Brasil, 1010",
      "bairro": "Jardins",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "PENDENTE"
  },
  {
    "id": "3",
    "documento": "01023",
    "motorista": {
      "nome": "Maria Oliveira"
    },
    "cliente_origem": {
      "nome": "Empresa GHI",
      "endereco": "Avenida Ibirapuera, 890",
      "bairro": "Moema",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Jo\u00e3o Mendes",
      "endereco": "Rua Pamplona, 567",
      "bairro": "Jardim Paulista",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "PENDENTE"
  },
  {
    "id": "4",
    "documento": "01024",
    "motorista": {
      "nome": "Jo\u00e3o Silva"
    },
    "cliente_origem": {
      "nome": "Empresa XYZ",
      "endereco": "Rua das Flores, 123",
      "bairro": "Liberdade",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Paula Silva",
      "endereco": "Rua da Consola\u00e7\u00e3o, 123",
      "bairro": "Centro",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "ENTREGUE"
  },
  {
    "id": "5",
    "documento": "01025",
    "motorista": {
      "nome": "Carlos Pereira"
    },
    "cliente_origem": {
      "nome": "Empresa ABC",
      "endereco": "Rua dos Pinheiros, 789",
      "bairro": "Bela Vista",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Carlos Lima",
      "endereco": "Rua Paulista, 101",
      "bairro": "Moema",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "ENTREGUE"
  },
  {
    "id": "6",
    "documento": "01026",
    "motorista": {
      "nome": "Carla Souza"
    },
    "cliente_origem": {
      "nome": "Empresa DEF",
      "endereco": "Rua Augusta, 345",
      "bairro": "Jardim Paulista",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Ana Souza",
      "endereco": "Rua Vergueiro, 567",
      "bairro": "Consola\u00e7\u00e3o",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "PENDENTE"
  },
  {
    "id": "7",
    "documento": "01027",
    "motorista": {
      "nome": "Maria Oliveira"
    },
    "cliente_origem": {
      "nome": "Empresa GHI",
      "endereco": "Avenida Ibirapuera, 890",
      "bairro": "Centro",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Maria Souza",
      "endereco": "Avenida Paulista, 456",
      "bairro": "Bela Vista",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "ENTREGUE"
  },
  {
    "id": "8",
    "documento": "01028",
    "motorista": {
      "nome": "Jo\u00e3o Silva"
    },
    "cliente_origem": {
      "nome": "Empresa XYZ",
      "endereco": "Rua das Flores, 123",
      "bairro": "Jardins",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Ana Clara",
      "endereco": "Rua Vergueiro, 1234",
      "bairro": "Liberdade",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "PENDENTE"
  },
  {
    "id": "9",
    "documento": "01029",
    "motorista": {
      "nome": "Carlos Pereira"
    },
    "cliente_origem": {
      "nome": "Empresa ABC",
      "endereco": "Rua dos Pinheiros, 789",
      "bairro": "Consola\u00e7\u00e3o",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Pedro Lima",
      "endereco": "Avenida Brasil, 1010",
      "bairro": "Jardins",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "PENDENTE"
  },
  {
    "id": "10",
    "documento": "01030",
    "motorista": {
      "nome": "Carla Souza"
    },
    "cliente_origem": {
      "nome": "Empresa DEF",
      "endereco": "Rua Augusta, 345",
      "bairro": "Moema",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Jo\u00e3o Mendes",
      "endereco": "Rua Pamplona, 567",
      "bairro": "Jardim Paulista",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "ENTREGUE"
  },
  {
    "id": "11",
    "documento": "01031",
    "motorista": {
      "nome": "Maria Oliveira"
    },
    "cliente_origem": {
      "nome": "Empresa GHI",
      "endereco": "Avenida Ibirapuera, 890",
      "bairro": "Liberdade",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Paula Silva",
      "endereco": "Rua da Consola\u00e7\u00e3o, 123",
      "bairro": "Centro",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "PENDENTE"
  },
  {
    "id": "12",
    "documento": "01032",
    "motorista": {
      "nome": "Jo\u00e3o Silva"
    },
    "cliente_origem": {
      "nome": "Empresa XYZ",
      "endereco": "Rua das Flores, 123",
      "bairro": "Bela Vista",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Carlos Lima",
      "endereco": "Rua Paulista, 101",
      "bairro": "Moema",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "PENDENTE"
  },
  {
    "id": "13",
    "documento": "01033",
    "motorista": {
      "nome": "Carlos Pereira"
    },
    "cliente_origem": {
      "nome": "Empresa ABC",
      "endereco": "Rua dos Pinheiros, 789",
      "bairro": "Jardim Paulista",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Ana Souza",
      "endereco": "Rua Vergueiro, 567",
      "bairro": "Consola\u00e7\u00e3o",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "ENTREGUE"
  },
  {
    "id": "14",
    "documento": "01034",
    "motorista": {
      "nome": "Carla Souza"
    },
    "cliente_origem": {
      "nome": "Empresa DEF",
      "endereco": "Rua Augusta, 345",
      "bairro": "Centro",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Maria Souza",
      "endereco": "Avenida Paulista, 456",
      "bairro": "Bela Vista",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "INSUCESSO"
  },
  {
    "id": "15",
    "documento": "01035",
    "motorista": {
      "nome": "Maria Oliveira"
    },
    "cliente_origem": {
      "nome": "Empresa GHI",
      "endereco": "Avenida Ibirapuera, 890",
      "bairro": "Jardins",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Ana Clara",
      "endereco": "Rua Vergueiro, 1234",
      "bairro": "Liberdade",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "PENDENTE"
  },
  {
    "id": "16",
    "documento": "01036",
    "motorista": {
      "nome": "Jo\u00e3o Silva"
    },
    "cliente_origem": {
      "nome": "Empresa XYZ",
      "endereco": "Rua das Flores, 123",
      "bairro": "Consola\u00e7\u00e3o",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Pedro Lima",
      "endereco": "Avenida Brasil, 1010",
      "bairro": "Jardins",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "ENTREGUE"
  },
  {
    "id": "17",
    "documento": "01037",
    "motorista": {
      "nome": "Carlos Pereira"
    },
    "cliente_origem": {
      "nome": "Empresa ABC",
      "endereco": "Rua dos Pinheiros, 789",
      "bairro": "Moema",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Jo\u00e3o Mendes",
      "endereco": "Rua Pamplona, 567",
      "bairro": "Jardim Paulista",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "PENDENTE"
  },
  {
    "id": "18",
    "documento": "01038",
    "motorista": {
      "nome": "Carla Souza"
    },
    "cliente_origem": {
      "nome": "Empresa DEF",
      "endereco": "Rua Augusta, 345",
      "bairro": "Liberdade",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Paula Silva",
      "endereco": "Rua da Consola\u00e7\u00e3o, 123",
      "bairro": "Centro",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "PENDENTE"
  },
  {
    "id": "19",
    "documento": "01039",
    "motorista": {
      "nome": "Maria Oliveira"
    },
    "cliente_origem": {
      "nome": "Empresa GHI",
      "endereco": "Avenida Ibirapuera, 890",
      "bairro": "Bela Vista",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Carlos Lima",
      "endereco": "Rua Paulista, 101",
      "bairro": "Moema",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "ENTREGUE"
  },
  {
    "id": "20",
    "documento": "01040",
    "motorista": {
      "nome": "Jo\u00e3o Silva"
    },
    "cliente_origem": {
      "nome": "Empresa XYZ",
      "endereco": "Rua das Flores, 123",
      "bairro": "Jardim Paulista",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Ana Souza",
      "endereco": "Rua Vergueiro, 567",
      "bairro": "Consola\u00e7\u00e3o",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "ENTREGUE"
  },
  {
    "id": "21",
    "documento": "01041",
    "motorista": {
      "nome": "Carlos Pereira"
    },
    "cliente_origem": {
      "nome": "Empresa ABC",
      "endereco": "Rua dos Pinheiros, 789",
      "bairro": "Centro",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Maria Souza",
      "endereco": "Avenida Paulista, 456",
      "bairro": "Bela Vista",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "PENDENTE"
  },
  {
    "id": "22",
    "documento": "01042",
    "motorista": {
      "nome": "Carla Souza"
    },
    "cliente_origem": {
      "nome": "Empresa DEF",
      "endereco": "Rua Augusta, 345",
      "bairro": "Jardins",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Ana Clara",
      "endereco": "Rua Vergueiro, 1234",
      "bairro": "Liberdade",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "ENTREGUE"
  },
  {
    "id": "23",
    "documento": "01043",
    "motorista": {
      "nome": "Maria Oliveira"
    },
    "cliente_origem": {
      "nome": "Empresa GHI",
      "endereco": "Avenida Ibirapuera, 890",
      "bairro": "Consola\u00e7\u00e3o",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Pedro Lima",
      "endereco": "Avenida Brasil, 1010",
      "bairro": "Jardins",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "INSUCESSO"
  },
  {
    "id": "24",
    "documento": "01044",
    "motorista": {
      "nome": "Jo\u00e3o Silva"
    },
    "cliente_origem": {
      "nome": "Empresa XYZ",
      "endereco": "Rua das Flores, 123",
      "bairro": "Moema",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Jo\u00e3o Mendes",
      "endereco": "Rua Pamplona, 567",
      "bairro": "Jardim Paulista",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "PENDENTE"
  },
  {
    "id": "25",
    "documento": "01045",
    "motorista": {
      "nome": "Carlos Pereira"
    },
    "cliente_origem": {
      "nome": "Empresa ABC",
      "endereco": "Rua dos Pinheiros, 789",
      "bairro": "Liberdade",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Paula Silva",
      "endereco": "Rua da Consola\u00e7\u00e3o, 123",
      "bairro": "Centro",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "ENTREGUE"
  },
  {
    "id": "26",
    "documento": "01046",
    "motorista": {
      "nome": "Carla Souza"
    },
    "cliente_origem": {
      "nome": "Empresa DEF",
      "endereco": "Rua Augusta, 345",
      "bairro": "Bela Vista",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Carlos Lima",
      "endereco": "Rua Paulista, 101",
      "bairro": "Moema",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "INSUCESSO"
  },
  {
    "id": "27",
    "documento": "01047",
    "motorista": {
      "nome": "Maria Oliveira"
    },
    "cliente_origem": {
      "nome": "Empresa GHI",
      "endereco": "Avenida Ibirapuera, 890",
      "bairro": "Jardim Paulista",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Ana Souza",
      "endereco": "Rua Vergueiro, 567",
      "bairro": "Consola\u00e7\u00e3o",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "PENDENTE"
  },
  {
    "id": "28",
    "documento": "01048",
    "motorista": {
      "nome": "Jo\u00e3o Silva"
    },
    "cliente_origem": {
      "nome": "Empresa XYZ",
      "endereco": "Rua das Flores, 123",
      "bairro": "Centro",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Maria Souza",
      "endereco": "Avenida Paulista, 456",
      "bairro": "Bela Vista",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "ENTREGUE"
  },
  {
    "id": "29",
    "documento": "01049",
    "motorista": {
      "nome": "Carlos Pereira"
    },
    "cliente_origem": {
      "nome": "Empresa ABC",
      "endereco": "Rua dos Pinheiros, 789",
      "bairro": "Jardins",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Ana Clara",
      "endereco": "Rua Vergueiro, 1234",
      "bairro": "Liberdade",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "INSUCESSO"
  },
  {
    "id": "30",
    "documento": "01050",
    "motorista": {
      "nome": "Carla Souza"
    },
    "cliente_origem": {
      "nome": "Empresa DEF",
      "endereco": "Rua Augusta, 345",
      "bairro": "Consola\u00e7\u00e3o",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Pedro Lima",
      "endereco": "Avenida Brasil, 1010",
      "bairro": "Jardins",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "PENDENTE"
  },
  {
    "id": "31",
    "documento": "01051",
    "motorista": {
      "nome": "Maria Oliveira"
    },
    "cliente_origem": {
      "nome": "Empresa GHI",
      "endereco": "Avenida Ibirapuera, 890",
      "bairro": "Moema",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Jo\u00e3o Mendes",
      "endereco": "Rua Pamplona, 567",
      "bairro": "Jardim Paulista",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "ENTREGUE"
  },
  {
    "id": "32",
    "documento": "01052",
    "motorista": {
      "nome": "Jo\u00e3o Silva"
    },
    "cliente_origem": {
      "nome": "Empresa XYZ",
      "endereco": "Rua das Flores, 123",
      "bairro": "Liberdade",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Paula Silva",
      "endereco": "Rua da Consola\u00e7\u00e3o, 123",
      "bairro": "Centro",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "INSUCESSO"
  },
  {
    "id": "33",
    "documento": "01053",
    "motorista": {
      "nome": "Carlos Pereira"
    },
    "cliente_origem": {
      "nome": "Empresa ABC",
      "endereco": "Rua dos Pinheiros, 789",
      "bairro": "Bela Vista",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Carlos Lima",
      "endereco": "Rua Paulista, 101",
      "bairro": "Moema",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "PENDENTE"
  },
  {
    "id": "34",
    "documento": "01054",
    "motorista": {
      "nome": "Carla Souza"
    },
    "cliente_origem": {
      "nome": "Empresa DEF",
      "endereco": "Rua Augusta, 345",
      "bairro": "Jardim Paulista",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Ana Souza",
      "endereco": "Rua Vergueiro, 567",
      "bairro": "Consola\u00e7\u00e3o",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "ENTREGUE"
  },
  {
    "id": "35",
    "documento": "01055",
    "motorista": {
      "nome": "Maria Oliveira"
    },
    "cliente_origem": {
      "nome": "Empresa GHI",
      "endereco": "Avenida Ibirapuera, 890",
      "bairro": "Centro",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Maria Souza",
      "endereco": "Avenida Paulista, 456",
      "bairro": "Bela Vista",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "INSUCESSO"
  },
  {
    "id": "36",
    "documento": "01056",
    "motorista": {
      "nome": "Jo\u00e3o Silva"
    },
    "cliente_origem": {
      "nome": "Empresa XYZ",
      "endereco": "Rua das Flores, 123",
      "bairro": "Jardins",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Ana Clara",
      "endereco": "Rua Vergueiro, 1234",
      "bairro": "Liberdade",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "PENDENTE"
  },
  {
    "id": "37",
    "documento": "01057",
    "motorista": {
      "nome": "Carlos Pereira"
    },
    "cliente_origem": {
      "nome": "Empresa ABC",
      "endereco": "Rua dos Pinheiros, 789",
      "bairro": "Consola\u00e7\u00e3o",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Pedro Lima",
      "endereco": "Avenida Brasil, 1010",
      "bairro": "Jardins",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "ENTREGUE"
  },
  {
    "id": "38",
    "documento": "01058",
    "motorista": {
      "nome": "Carla Souza"
    },
    "cliente_origem": {
      "nome": "Empresa DEF",
      "endereco": "Rua Augusta, 345",
      "bairro": "Moema",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Jo\u00e3o Mendes",
      "endereco": "Rua Pamplona, 567",
      "bairro": "Jardim Paulista",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "INSUCESSO"
  },
  {
    "id": "39",
    "documento": "01059",
    "motorista": {
      "nome": "Maria Oliveira"
    },
    "cliente_origem": {
      "nome": "Empresa GHI",
      "endereco": "Avenida Ibirapuera, 890",
      "bairro": "Liberdade",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Paula Silva",
      "endereco": "Rua da Consola\u00e7\u00e3o, 123",
      "bairro": "Centro",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "PENDENTE"
  },
  {
    "id": "40",
    "documento": "01060",
    "motorista": {
      "nome": "Jo\u00e3o Silva"
    },
    "cliente_origem": {
      "nome": "Empresa XYZ",
      "endereco": "Rua das Flores, 123",
      "bairro": "Bela Vista",
      "cidade": "S\u00e3o Paulo"
    },
    "cliente_destino": {
      "nome": "Carlos Lima",
      "endereco": "Rua Paulista, 101",
      "bairro": "Moema",
      "cidade": "S\u00e3o Paulo"
    },
    "status_entrega": "ENTREGUE"
  }
]

interface GroupedDeliveryProgressEachDriver {
  [key: string]: DeliveryProgressEachDriver;
}

interface GroupedNumberDeliveries {
  [key: string]: NumberDeliveries;
}

interface GroupedDeliveryProgressByNeighborhood {
  [key: string]: DeliveryProgressByNeighborhood;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatToolbarModule,
    TableComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  readonly panelOpenState = signal(false);

  displayedColumnsDeliveryProgressEachDriver: string[] = ['nome', 'pendentes', 'realizadas'];
  displayedColumnsNumberDeliveries: string[] = ['nome', 'total'];
  displayedColumnsDeliveryProgressByNeighborhood: string[] = ['bairro', 'total', 'realizadas'];

  dataSourceDeliveryProgressEachDriver: DeliveryProgressEachDriver[] = [];
  dataSourceNumberDeliveries: NumberDeliveries[] = [];
  dataSourceDeliveryProgressByNeighborhood: DeliveryProgressByNeighborhood[] = [];

  ngOnInit(): void {
    this.dataSourceDeliveryProgressEachDriver = this.getDeliveryProgressEachDriver();
    this.dataSourceNumberDeliveries = this.getNumberDeliveries();
    this.dataSourceDeliveryProgressByNeighborhood = this.getDeliveryProgressByNeighborhood();
  }

  getDeliveryProgressEachDriver(): DeliveryProgressEachDriver[] {
    const grouped: GroupedDeliveryProgressEachDriver = deliveries.reduce((acc, delivery) => {
      const motoristaNome = delivery.motorista.nome;
      if (!acc[motoristaNome]) {
        acc[motoristaNome] = { nome: motoristaNome, pendentes: 0, realizadas: 0 };
      }
      if (delivery.status_entrega === 'PENDENTE') {
        acc[motoristaNome].pendentes++;
      } else if (delivery.status_entrega === 'ENTREGUE') {
        acc[motoristaNome].realizadas++;
      }
      return acc;
    }, {} as GroupedDeliveryProgressEachDriver);

    return Object.values(grouped);
  }

  getNumberDeliveries(): NumberDeliveries[] {
    const grouped: GroupedNumberDeliveries = deliveries.reduce((acc, delivery) => {
      const motoristaNome = delivery.motorista.nome;
      if (!acc[motoristaNome]) {
        acc[motoristaNome] = { nome: motoristaNome, total: 0 };
      }
      if (delivery.status_entrega === 'INSUCESSO') {
        acc[motoristaNome].total++;
      }
      return acc;
    }, {} as GroupedNumberDeliveries);

    return Object.values(grouped);
  }

  getDeliveryProgressByNeighborhood(): DeliveryProgressByNeighborhood[] {
    const grouped: GroupedDeliveryProgressByNeighborhood = deliveries.reduce((acc, delivery) => {
      const bairro = delivery.cliente_destino.bairro;
      if (!acc[bairro]) {
        acc[bairro] = { bairro, total: 0, realizadas: 0 };
      }
      acc[bairro].total++;
      if (delivery.status_entrega === 'ENTREGUE') {
        acc[bairro].realizadas++;
      }
      return acc;
    }, {} as Record<string, DeliveryProgressByNeighborhood>);

    return Object.values(grouped);
  }

}
