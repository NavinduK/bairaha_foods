import { createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios'
import { dispatch } from '../store'
import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  DocumentData,
} from 'firebase/firestore'
import { Timestamp } from 'firebase/firestore' // Import Firestore Timestamp
import { db } from '../../../firebase/clientApp'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
const baseUrl = 'machinelogs'

const initialState: any = {
  isLoading: false,
  error: null,
  machinelogs: [],
  count: 0,
}

const slice = createSlice({
  name: 'machinelogs',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true
    },

    // GET ALL
    getMachinesLogs(state, action) {
      state.isLoading = false
      state.machinelogs = action.payload
      state.count = action.payload.length
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false
      state.error = action.payload
    },

    // setSuccess
    clearState() {
      return initialState
    },
  },
})

// Reducer
// export const {} = slice.actions

export default slice.reducer

// ----------------------------------------------------------------------

export function getMachinesLogsByMachine(
  pageNumber: number,
  rowsPerPage: number
) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading())
      const queryMachines = await getDocs(collection(db, 'machine_collection'))
      const machineData = queryMachines.docs.map((doc) => doc.data())

      const startTimestamp = Timestamp.fromMillis(
        new Date('2023-11-20 00:00:00').getTime()
      )
      const endTimestamp = Timestamp.fromMillis(
        new Date('2023-12-10 23:59:59').getTime()
      )

      //Get machine logs
      const statement = query(
        collection(db, 'maintain_log'),
        where('createdAt', '>', startTimestamp),
        where('createdAt', '<', endTimestamp),
        orderBy('createdAt')
      )
      const queryLogs = await getDocs(statement)
      const formattedLogs = queryLogs.docs.map((doc) => {
        const data = doc.data()
        return {
          ...data,
          createdAt: data.createdAt.toDate(),
        }
      })

      const logData = formattedLogs
      console.log(logData)

      if (logData.length > 0 && machineData.length > 0) {
        const filteredData: any[] = []
        machineData.map((machine: any) => {
          const machineLogs: any[] = []
          const machineId = machine.firebaseId

          let currentLog: any | null = null

          logData.map((machine_log: any) => {
            if (machine_log.machineId == machineId) {
              if (!currentLog) {
                currentLog = {
                  broken: null,
                  fixing: null,
                  active: null,
                }
              }
              if (machine_log.category == 'Broken') {
                currentLog.broken = machine_log
              } else if (machine_log.category == 'Fixing') {
                if (currentLog.broken != null) {
                  currentLog.fixing = machine_log
                }
              } else if (machine_log.category == 'Active') {
                if (currentLog.broken != null && currentLog.fixing != null) {
                  if (
                    machine_log.timeToComplete &&
                    machine_log.timeToComplete != ''
                  ) {
                    const [hours, minutes, seconds] = machine_log.timeToComplete
                      .split(' : ')
                      .map((value: any) => parseInt(value))
                    console.log(hours, minutes, seconds)

                    machine_log.timeToComplete =
                      hours * 3600 + minutes * 60 + seconds
                  }
                  currentLog.active = machine_log
                  machineLogs.push(currentLog)
                  currentLog = null
                }
              }
            }
          })

          if (machineLogs.length > 0) {
            filteredData.push({ machine: machine, logs: machineLogs })
          }
        })
        console.log(filteredData)
        dispatch(slice.actions.getMachinesLogs(filteredData))
        return filteredData
      } else {
        dispatch(slice.actions.getMachinesLogs([]))
        return []
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error))
      return error
    }
  }
}

export function getMachinesLogs(start: string | null, end: string | null) {
  return async () => {
    try {
      dispatch(slice.actions.startLoading())
      const queryMachines = await getDocs(collection(db, 'machine_collection'))
      const machineData = queryMachines.docs.map((doc) => doc.data())

      const startTimestamp = Timestamp.fromMillis(
        new Date(`${start} 00:00:00`).getTime()
      )
      const endTimestamp = Timestamp.fromMillis(
        new Date(`${end} 23:59:59`).getTime()
      )

      //Get machine logs
      const statement = query(
        collection(db, 'maintain_log'),
        where('createdAt', '>', startTimestamp),
        where('createdAt', '<', endTimestamp),
        orderBy('createdAt')
      )
      const queryLogs = await getDocs(statement)
      const formattedLogs = queryLogs.docs.map((doc) => {
        const data = doc.data()
        return {
          ...data,
          createdAt: data.createdAt.toDate(),
        }
      })

      const logData = formattedLogs

      if (logData.length > 0 && machineData.length > 0) {
        const filteredData: any[] = []
        machineData.map((machine: any) => {
          const machineId = machine.firebaseId

          let currentLog: any | null = null
          logData.map((machine_log: any) => {
            if (machine_log.machineId == machineId) {
              if (!currentLog) {
                currentLog = {
                  broken: null,
                  fixing: null,
                  active: null,
                }
              }
              if (machine_log.category == 'Broken') {
                currentLog.broken = machine_log
              } else if (machine_log.category == 'Fixing') {
                if (currentLog.broken != null) {
                  currentLog.fixing = machine_log
                }
              } else if (machine_log.category == 'Active') {
                if (currentLog.broken != null && currentLog.fixing != null) {
                  currentLog.active = machine_log
                  filteredData.push({ machine: machine, log: currentLog })
                  currentLog = null
                }
              }
            }
          })
        })

        const sortedData = filteredData.sort(
          (a, b) => b.log.broken.createdAt - a.log.broken.createdAt
        )
        dispatch(slice.actions.getMachinesLogs(sortedData))
        return filteredData
      } else {
        dispatch(slice.actions.getMachinesLogs([]))
        return []
      }
    } catch (error) {
      console.log(error)
      dispatch(slice.actions.hasError(error))
      return error
    }
  }
}
