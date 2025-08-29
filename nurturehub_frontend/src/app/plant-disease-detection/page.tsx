"use client";

import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { Upload, Leaf, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DiagnosePlantOutput } from "./model";
import { getDiagnosisFromAPI } from "./service";

export default function PlantDiseaseDetectionPage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosePlantOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUri = event.target?.result as string;
        setPhoto(dataUri);
        setResult(null);
        setError(null);
        handleDiagnose(dataUri);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const triggerPhotoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleDiagnose = async (photoDataUri: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const diagnosisResult = await getDiagnosisFromAPI(photoDataUri);
      setResult(diagnosisResult);
    } catch (err) {
      console.error(err);
      setError("An error occurred during diagnosis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setPhoto(null);
    setResult(null);
    setError(null);
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Leaf className="text-primary" />
            Plant Disease Detection
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Upload a photo of your plant, and our service will analyze it for
            species and potential issues.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {!photo && (
            <div
              onClick={triggerPhotoUpload}
              className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 cursor-pointer hover:border-primary"
            >
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-sm text-gray-600">
                  Click to upload a photo
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG, or WEBP
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />
            </div>
          )}

          {photo && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-4">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden border">
                  <Image
                    src={photo}
                    alt="Uploaded plant"
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  onClick={resetState}
                  variant="outline"
                  className="w-full"
                >
                  Upload Another Photo
                </Button>
              </div>

              <div className="space-y-4">
                {isLoading && (
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                )}
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {result && !result.identification.isPlant && (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Not a Plant</AlertTitle>
                    <AlertDescription>
                      Our service could not identify a plant in the uploaded
                      image. Please try another photo.
                    </AlertDescription>
                  </Alert>
                )}
                {result && result.identification.isPlant && (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">
                          Identification
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>
                          <strong>Common Name:</strong>{" "}
                          {result.identification.commonName}
                        </p>
                        <p>
                          <strong>Latin Name:</strong>{" "}
                          {result.identification.latinName}
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-xl">Diagnosis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="flex items-center gap-2">
                          <strong>Status:</strong>
                          <span className="font-semibold text-green-600">
                            Healthy
                          </span>
                        </p>
                        <div className="mt-2 text-muted-foreground prose prose-sm whitespace-pre-wrap">
                          <p>{result.diagnosis.diagnosis}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
