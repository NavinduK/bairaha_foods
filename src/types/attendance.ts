export type AddAttendance = {
  direction: 'CHECKIN' | 'CHECKOUT'
  longitude: string
  latitude: string
  center: string
  uuid?: string
}

export type Attendance = {
  id: number
  direction: 'CHECKIN' | 'CHECKOUT'
  longitude: string
  latitude: string
  center: string
  status: 'PENDING' | 'ACTIVE' | 'INACTIVE' | 'COMPLETE'
  attendanceDateTime: number
  uuid: string
}

export type AttendanceState = {
  isLoading: boolean
  error: any
  attendance: Attendance[]
  employeeAttendance: EmployeeAttendance | null
}

export type EmployeeAttendance = {
  attendance: Attendance[]
  employee: any
  count: number
}
