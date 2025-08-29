export interface DiagnosePlantOutput {
  identification: {
    isPlant: boolean;
    commonName: string;
    latinName: string;
  };
  diagnosis: {
    isHealthy: boolean;
    diagnosis: string;
  };
}