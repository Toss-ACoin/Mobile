import React from 'react';
import { ScrollView } from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component'; // You may need to install this library
import Action from './Action/Action';

const userHeaders = [
  'Id',
  'Name',
  'Surname',
  'Email',
  'Role',
  'Account number',
  'Action',
];

const UserTable = ({ usersData }) => {
  const tableData = usersData.map((user) => [
    user.id.toString(),
    user.name,
    user.surname,
    user.email,
    user.role,
    user.bank_number,
    <Action key={user.id} id={user.id} isBaned={user.blocked} />,
  ]);

  return (
    <ScrollView>
      <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
        <Row
          data={userHeaders}
          style={{ height: 40, backgroundColor: '#f1f8ff' }}
          textStyle={{ textAlign: 'center', fontWeight: 'bold' }}
        />
        <Rows
          data={tableData}
          textStyle={{ textAlign: 'center' }}
        />
      </Table>
    </ScrollView>
  );
};

export default UserTable;
