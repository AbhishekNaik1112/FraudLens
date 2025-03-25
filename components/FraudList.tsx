/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, Shield, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function FraudList() {
  const { data, error, mutate } = useSWR('/api/fraud-data', fetcher);
  const [actionMsg, setActionMsg] = useState('');

  if (error)
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Error loading data. Please try again later.</AlertDescription>
      </Alert>
    );

  if (!data)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );

  const { fraudulent_apps, fraudulent_urls } = data;

  const handleAction = async (entityType: 'app' | 'url', id: string, action: string) => {
    try {
      const res = await fetch('/api/fraud-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entityType, id, action }),
      });
      const result = await res.json();
      if (result.success) {
        setActionMsg(`Action "${action}" applied successfully`);
        mutate();
      } else {
        setActionMsg(`Error: ${result.message}`);
      }
    } catch (error) {
      setActionMsg('Error performing action');
      console.error(error);
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return (
          <Badge variant="destructive" className="ml-2">
            High Risk
          </Badge>
        );
      case 'medium':
        return (
          <Badge variant="destructive" className="ml-2 bg-amber-500">
            Medium Risk
          </Badge>
        );
      case 'low':
        return (
          <Badge variant="outline" className="ml-2">
            Low Risk
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="ml-2">
            Unknown Risk
          </Badge>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'report':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            Report
          </Badge>
        );
      case 'block':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            Block
          </Badge>
        );
      case 'investigate':
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
            Investigate
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-8">
      {actionMsg && (
        <Alert className="border-green-200 bg-green-50 text-green-800 animate-in fade-in duration-300">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription>{actionMsg}</AlertDescription>
        </Alert>
      )}

      <Card className="overflow-hidden border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b p-4">
          <div className="flex items-center">
            <Shield className="mr-3 h-6 w-6 text-purple-600" />
            <CardTitle className="text-2xl font-bold text-gray-800">Fraudulent Apps</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4">
            {fraudulent_apps.map((app: any) => (
              <Card
                key={app._id}
                className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                    <div className="flex items-center">
                      <h3 className="font-bold text-lg">{app.app_name}</h3>
                      {getRiskBadge(app.risk_level)}
                    </div>
                    <div>{getStatusBadge(app.actionStatus)}</div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <span className="font-medium text-foreground mr-1">Developer:</span>{' '}
                      {app.developer}
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-foreground mr-1">Category:</span>{' '}
                      {app.category}
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-foreground mr-1">Reported:</span>{' '}
                      {new Date(app.reported_on).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => handleAction('app', app._id, 'report')}
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      Report
                    </Button>
                    <Button
                      onClick={() => handleAction('app', app._id, 'block')}
                      variant="destructive"
                      size="sm"
                    >
                      Block
                    </Button>
                    <Button
                      onClick={() => handleAction('app', app._id, 'investigate')}
                      variant="outline"
                      size="sm"
                      className="text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                    >
                      Investigate
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b p-4">
          <div className="flex items-center">
            <AlertTriangle className="mr-3 h-6 w-6 text-red-600" />
            <CardTitle className="text-2xl font-bold text-gray-800">Fraudulent URLs</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4">
            {fraudulent_urls.map((urlData: any) => (
              <Card
                key={urlData._id}
                className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                    <div className="flex items-center">
                      <h3 className="font-bold text-lg truncate max-w-[300px] sm:max-w-[400px]">
                        <a
                          href={urlData.url}
                          className="text-primary hover:text-primary/80 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {urlData.url}
                        </a>
                      </h3>
                      {getRiskBadge(urlData.risk_level)}
                    </div>
                    <div>{getStatusBadge(urlData.actionStatus)}</div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <span className="font-medium text-foreground mr-1">Category:</span>{' '}
                      {urlData.category}
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-foreground mr-1">Detected:</span>{' '}
                      {new Date(urlData.detected_on).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => handleAction('url', urlData._id, 'report')}
                      variant="outline"
                      size="sm"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      Report
                    </Button>
                    <Button
                      onClick={() => handleAction('url', urlData._id, 'block')}
                      variant="destructive"
                      size="sm"
                    >
                      Block
                    </Button>
                    <Button
                      onClick={() => handleAction('url', urlData._id, 'investigate')}
                      variant="outline"
                      size="sm"
                      className="text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700"
                    >
                      Investigate
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
