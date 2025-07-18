
"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { 
  Plus, 
  Trash2, 
  Clock, 
  Car, 
  FileText,
  Download,
} from 'lucide-react'
import { 
  shiftReportTemplate, 
  activityTypes, 
  commonDispositions,
  type ShiftActivity,
  type ShiftReportData 
} from '@/data/field-procedures/shift-report'

export const ShiftReportClient = React.memo(() => {
  const [shiftData, setShiftData] = useState<ShiftReportData>(shiftReportTemplate)
  const [newActivity, setNewActivity] = useState<Partial<ShiftActivity>>({})

  const addActivity = () => {
    if (newActivity.time && newActivity.type && newActivity.description) {
      const activity: ShiftActivity = {
        id: Date.now().toString(),
        time: newActivity.time,
        type: newActivity.type as ShiftActivity['type'],
        location: newActivity.location || '',
        description: newActivity.description,
        disposition: newActivity.disposition || 'Completed',
        reportNumber: newActivity.reportNumber,
        arrestsMade: newActivity.arrestsMade || 0,
        citationsIssued: newActivity.citationsIssued || 0,
        warningsGiven: newActivity.warningsGiven || 0
      }

      setShiftData(prev => ({
        ...prev,
        activities: [...prev.activities, activity]
      }))

      // Update metrics
      updateMetrics(activity)
      setNewActivity({})
    }
  }

  const updateMetrics = (activity: ShiftActivity) => {
    setShiftData(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        totalCalls: activity.type === 'Call for Service' ? prev.metrics.totalCalls + 1 : prev.metrics.totalCalls,
        totalTrafficStops: activity.type === 'Traffic Stop' ? prev.metrics.totalTrafficStops + 1 : prev.metrics.totalTrafficStops,
        totalArrests: prev.metrics.totalArrests + (activity.arrestsMade || 0),
        totalCitations: prev.metrics.totalCitations + (activity.citationsIssued || 0),
        totalWarnings: prev.metrics.totalWarnings + (activity.warningsGiven || 0)
      }
    }))
  }

  const removeActivity = (id: string) => {
    setShiftData(prev => ({
      ...prev,
      activities: prev.activities.filter(activity => activity.id !== id)
    }))
  }

  const generateReport = () => {
    const report = `
SHIFT REPORT

Officer Information:
Name: ${shiftData.officerInfo.name}
Badge Number: ${shiftData.officerInfo.badgeNumber}
Unit: ${shiftData.officerInfo.unit}
Beat: ${shiftData.officerInfo.beat}

Shift Details:
Date: ${shiftData.shiftDetails.date}
Start Time: ${shiftData.shiftDetails.startTime}
End Time: ${shiftData.shiftDetails.endTime}
Supervisor: ${shiftData.shiftDetails.supervisor}
${shiftData.shiftDetails.partner ? `Partner: ${shiftData.shiftDetails.partner}` : ''}

Shift Metrics:
Total Calls for Service: ${shiftData.metrics.totalCalls}
Total Traffic Stops: ${shiftData.metrics.totalTrafficStops}
Total Arrests: ${shiftData.metrics.totalArrests}
Total Citations: ${shiftData.metrics.totalCitations}
Total Warnings: ${shiftData.metrics.totalWarnings}
${shiftData.metrics.milesPatrolled ? `Miles Patrolled: ${shiftData.metrics.milesPatrolled}` : ''}

Activities:
${shiftData.activities.map(activity => `
${activity.time} - ${activity.type}
Location: ${activity.location || 'N/A'}
Description: ${activity.description}
Disposition: ${activity.disposition}
${activity.reportNumber ? `Report Number: ${activity.reportNumber}` : ''}
`).join('')}

Equipment Status:
Vehicle: ${shiftData.equipmentStatus.vehicle.condition}
Mileage: ${shiftData.equipmentStatus.vehicle.mileageStart} - ${shiftData.equipmentStatus.vehicle.mileageEnd}
Fuel Level: ${shiftData.equipmentStatus.vehicle.fuelLevel}
Radio: ${shiftData.equipmentStatus.radio}
Body Camera: ${shiftData.equipmentStatus.bodyCamera}
Weapon: ${shiftData.equipmentStatus.weapon}

${shiftData.notableEvents.length > 0 ? `Notable Events:
${shiftData.notableEvents.map(event => `• ${event}`).join('\n')}` : ''}

${shiftData.followUpRequired?.length ? `Follow-up Required:
${shiftData.followUpRequired.map(item => `• ${item}`).join('\n')}` : ''}

Shift Summary:
${shiftData.shiftSummary}
    `.trim()

    const blob = new Blob([report], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `shift-report-${shiftData.shiftDetails.date}-${shiftData.officerInfo.badgeNumber}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="info">Officer Info</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Officer & Shift Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Officer Name</Label>
                  <Input
                    id="name"
                    value={shiftData.officerInfo.name}
                    onChange={(e) => setShiftData(prev => ({
                      ...prev,
                      officerInfo: { ...prev.officerInfo, name: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="badge">Badge Number</Label>
                  <Input
                    id="badge"
                    value={shiftData.officerInfo.badgeNumber}
                    onChange={(e) => setShiftData(prev => ({
                      ...prev,
                      officerInfo: { ...prev.officerInfo, badgeNumber: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    value={shiftData.officerInfo.unit}
                    onChange={(e) => setShiftData(prev => ({
                      ...prev,
                      officerInfo: { ...prev.officerInfo, unit: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="beat">Beat</Label>
                  <Input
                    id="beat"
                    value={shiftData.officerInfo.beat}
                    onChange={(e) => setShiftData(prev => ({
                      ...prev,
                      officerInfo: { ...prev.officerInfo, beat: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={shiftData.shiftDetails.date}
                    onChange={(e) => setShiftData(prev => ({
                      ...prev,
                      shiftDetails: { ...prev.shiftDetails, date: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="supervisor">Supervisor</Label>
                  <Input
                    id="supervisor"
                    value={shiftData.shiftDetails.supervisor}
                    onChange={(e) => setShiftData(prev => ({
                      ...prev,
                      shiftDetails: { ...prev.shiftDetails, supervisor: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={shiftData.shiftDetails.startTime}
                    onChange={(e) => setShiftData(prev => ({
                      ...prev,
                      shiftDetails: { ...prev.shiftDetails, startTime: e.target.value }
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={shiftData.shiftDetails.endTime}
                    onChange={(e) => setShiftData(prev => ({
                      ...prev,
                      shiftDetails: { ...prev.shiftDetails, endTime: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Shift Activities
              </CardTitle>
              <CardDescription>
                Add activities throughout your shift. Metrics will be automatically calculated.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-lg">
                <div>
                  <Label htmlFor="activityTime">Time</Label>
                  <Input
                    id="activityTime"
                    type="time"
                    value={newActivity.time || ''}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="activityType">Type</Label>
                  <Select onValueChange={(value) => setNewActivity(prev => ({ ...prev, type: value as ShiftActivity['type'] }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity type" />
                    </SelectTrigger>
                    <SelectContent>
                      {activityTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newActivity.location || ''}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Address or location"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newActivity.description || ''}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of activity"
                  />
                </div>
                <div>
                  <Label htmlFor="disposition">Disposition</Label>
                  <Select onValueChange={(value) => setNewActivity(prev => ({ ...prev, disposition: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select disposition" />
                    </SelectTrigger>
                    <SelectContent>
                      {commonDispositions.map(disposition => (
                        <SelectItem key={disposition} value={disposition}>{disposition}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-3 flex justify-end">
                  <Button onClick={addActivity} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Activity
                  </Button>
                </div>
              </div>

              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {shiftData.activities.map((activity) => (
                    <Card key={activity.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{activity.time}</Badge>
                            <Badge>{activity.type}</Badge>
                          </div>
                          <p className="font-medium">{activity.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.location && `Location: ${activity.location} • `}
                            Disposition: {activity.disposition}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeActivity(activity.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Equipment Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Vehicle</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="mileageStart">Starting Mileage</Label>
                    <Input
                      id="mileageStart"
                      type="number"
                      value={shiftData.equipmentStatus.vehicle.mileageStart}
                      onChange={(e) => setShiftData(prev => ({
                        ...prev,
                        equipmentStatus: {
                          ...prev.equipmentStatus,
                          vehicle: { ...prev.equipmentStatus.vehicle, mileageStart: parseInt(e.target.value) || 0 }
                        }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mileageEnd">Ending Mileage</Label>
                    <Input
                      id="mileageEnd"
                      type="number"
                      value={shiftData.equipmentStatus.vehicle.mileageEnd}
                      onChange={(e) => setShiftData(prev => ({
                        ...prev,
                        equipmentStatus: {
                          ...prev.equipmentStatus,
                          vehicle: { ...prev.equipmentStatus.vehicle, mileageEnd: parseInt(e.target.value) || 0 }
                        }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fuelLevel">Fuel Level</Label>
                    <Select value={shiftData.equipmentStatus.vehicle.fuelLevel} onValueChange={(value) => setShiftData(prev => ({
                      ...prev,
                      equipmentStatus: {
                        ...prev.equipmentStatus,
                        vehicle: { ...prev.equipmentStatus.vehicle, fuelLevel: value as any }
                      }
                    }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select fuel level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full">Full</SelectItem>
                        <SelectItem value="3/4">3/4</SelectItem>
                        <SelectItem value="1/2">1/2</SelectItem>
                        <SelectItem value="1/4">1/4</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Radio</Label>
                  <Select value={shiftData.equipmentStatus.radio} onValueChange={(value) => setShiftData(prev => ({
                    ...prev,
                    equipmentStatus: { ...prev.equipmentStatus, radio: value as any }
                  }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Radio status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Operational">Operational</SelectItem>
                      <SelectItem value="Issues">Issues</SelectItem>
                      <SelectItem value="Non-Functional">Non-Functional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Body Camera</Label>
                  <Select value={shiftData.equipmentStatus.bodyCamera} onValueChange={(value) => setShiftData(prev => ({
                    ...prev,
                    equipmentStatus: { ...prev.equipmentStatus, bodyCamera: value as any }
                  }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Body camera status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Operational">Operational</SelectItem>
                      <SelectItem value="Issues">Issues</SelectItem>
                      <SelectItem value="Non-Functional">Non-Functional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Weapon</Label>
                  <Select value={shiftData.equipmentStatus.weapon} onValueChange={(value) => setShiftData(prev => ({
                    ...prev,
                    equipmentStatus: { ...prev.equipmentStatus, weapon: value as any }
                  }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Weapon status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Secured">Secured</SelectItem>
                      <SelectItem value="Issues">Issues</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Shift Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="shiftSummary">Overall Shift Summary</Label>
                <Textarea
                  id="shiftSummary"
                  value={shiftData.shiftSummary}
                  onChange={(e) => setShiftData(prev => ({ ...prev, shiftSummary: e.target.value }))}
                  placeholder="Provide a general overview of your shift, notable events, and any observations..."
                  rows={6}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Shift Metrics</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Total Calls:</span>
                      <span>{shiftData.metrics.totalCalls}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Traffic Stops:</span>
                      <span>{shiftData.metrics.totalTrafficStops}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Arrests:</span>
                      <span>{shiftData.metrics.totalArrests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Citations:</span>
                      <span>{shiftData.metrics.totalCitations}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Warnings:</span>
                      <span>{shiftData.metrics.totalWarnings}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">Vehicle Info</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Miles Driven:</span>
                      <span>{shiftData.equipmentStatus.vehicle.mileageEnd - shiftData.equipmentStatus.vehicle.mileageStart}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fuel Level:</span>
                      <span>{shiftData.equipmentStatus.vehicle.fuelLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Condition:</span>
                      <span>{shiftData.equipmentStatus.vehicle.condition}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Report Preview
              </CardTitle>
              <div className="flex gap-2">
                <Button onClick={generateReport} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <pre className="text-sm whitespace-pre-wrap font-mono">
                  {`SHIFT REPORT

Officer Information:
Name: ${shiftData.officerInfo.name || '[Not Set]'}
Badge Number: ${shiftData.officerInfo.badgeNumber || '[Not Set]'}
Unit: ${shiftData.officerInfo.unit || '[Not Set]'}
Beat: ${shiftData.officerInfo.beat || '[Not Set]'}

Shift Details:
Date: ${shiftData.shiftDetails.date || '[Not Set]'}
Start Time: ${shiftData.shiftDetails.startTime || '[Not Set]'}
End Time: ${shiftData.shiftDetails.endTime || '[Not Set]'}
Supervisor: ${shiftData.shiftDetails.supervisor || '[Not Set]'}

Shift Metrics:
Total Calls for Service: ${shiftData.metrics.totalCalls}
Total Traffic Stops: ${shiftData.metrics.totalTrafficStops}
Total Arrests: ${shiftData.metrics.totalArrests}
Total Citations: ${shiftData.metrics.totalCitations}
Total Warnings: ${shiftData.metrics.totalWarnings}

Activities (${shiftData.activities.length} total):
${shiftData.activities.length === 0 ? '[No activities recorded]' : shiftData.activities.map(activity => `
${activity.time} - ${activity.type}
Location: ${activity.location || 'N/A'}
Description: ${activity.description}
Disposition: ${activity.disposition}
${activity.reportNumber ? `Report Number: ${activity.reportNumber}` : ''}
`).join('')}

Equipment Status:
Vehicle: ${shiftData.equipmentStatus.vehicle.condition}
Mileage: ${shiftData.equipmentStatus.vehicle.mileageStart} - ${shiftData.equipmentStatus.vehicle.mileageEnd} (${shiftData.equipmentStatus.vehicle.mileageEnd - shiftData.equipmentStatus.vehicle.mileageStart} miles)
Fuel Level: ${shiftData.equipmentStatus.vehicle.fuelLevel}
Radio: ${shiftData.equipmentStatus.radio}
Body Camera: ${shiftData.equipmentStatus.bodyCamera}
Weapon: ${shiftData.equipmentStatus.weapon}

Shift Summary:
${shiftData.shiftSummary || '[No summary provided]'}`}
                </pre>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
})

ShiftReportClient.displayName = "ShiftReportClient"
