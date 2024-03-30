import * as React from 'react';

import {
    Paper
} from "@mantine/core"

import { 
    ViewState,
    EditingState,
    IntegratedEditing
    } from '@devexpress/dx-react-scheduler';
    
import {
  Scheduler,
  MonthView,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
  ConfirmationDialog
} from '@devexpress/dx-react-scheduler-material-ui';


// Months start at 0
const appointments = [
  {
    title: 'Website Re-Design Plan',
    startDate: new Date(2024, 2, 25, 9, 35),
    endDate: new Date(2024, 2, 25, 11, 30),
    id: 0,
    location: 'Room 1',
  }, {
    title: 'Book Flights to San Fran for Sales Trip',
    startDate: new Date(2024, 2, 25, 12, 11),
    endDate: new Date(2024, 2, 25, 13, 0),
    id: 1,
    location: 'Room 1',
  }, {
    title: 'Install New Router in Dev Room',
    startDate: new Date(2024, 2, 25, 14, 30),
    endDate: new Date(2024, 2, 25, 15, 35),
    id: 2,
    location: 'Room 2',
  }, {
    title: 'Approve Personal Computer Upgrade Plan',
    startDate: new Date(2024, 2, 26, 10, 0),
    endDate: new Date(2024, 2, 26, 11, 0),
    id: 3,
    location: 'Room 2',
  }, {
    title: 'Final Budget Review',
    startDate: new Date(2024, 2, 26, 12, 0),
    endDate: new Date(2024, 2, 26, 13, 35),
    id: 4,
    location: 'Room 2',
  },
];

export default class PetRecords extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: appointments,
            currentDate: new Date(),
        };
        this.currentDateChange = (currentDate) => { this.setState({ currentDate }); };
        this.commitChanges = this.commitChanges.bind(this);
    }

    commitChanges({ added, changed, deleted }) {
        this.setState((state) => {
        let { data } = state;
        if (added) {
            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            data = [...data, { id: startingAddedId, ...added }];
        }
        if (changed) {
            data = data.map(appointment => (
            changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
        }
        if (deleted !== undefined) {
            data = data.filter(appointment => appointment.id !== deleted);
        }
        return { data };
        });
    }

    render() {
        const { data, currentDate } = this.state;

        return (
        <Paper className='p-4 rounded-2xl'>
            <Scheduler
            data={data}
            height={700}
            >
            <ViewState
                currentDate={currentDate}
                onCurrentDateChange={this.currentDateChange}
            />
            <EditingState
                onCommitChanges={this.commitChanges}
            />
            <IntegratedEditing />
            <MonthView
                startDayHour={9}
                endDayHour={19}
            />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <Appointments />
            <AppointmentTooltip
                showCloseButton
                showOpenButton
                showDeleteButton
            />
            <AppointmentForm/>
            </Scheduler>
        </Paper>
        );
    }
}


