import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'


import { BorderRadius, BorderWidth, Colors, GlobalStyle } from '@/constants'

import StaticScreenWrapper from '@/components/layout/StaticScreenWrapper'
import { Box, ScrollView, HStack, VStack } from '@gluestack-ui/themed'
import { useIsFocused } from '@react-navigation/native';

interface LogsProps{
  id: string|undefined,
  user_id: string|undefined,
  action: string|undefined,
  table_name: string|undefined,
  record_id: string|undefined,
  changes: Record<string, any>|undefined,
  created_at: string|undefined,
}

export default function  AuditLogsMainScreen (){
  const isFocused = useIsFocused();

  const [logs, setLogs] = useState<LogsProps[]>([]);

  useEffect(()=>{
    fetchLogs();
  },[isFocused])

  const fetchLogs = async () =>{
    try{
      const res = await api.logs.all();
      console.log('res in logs:' ,res);
      setLogs(res.data)
    }catch(error){
      console.log(error);
    }
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const datePart = date.toLocaleDateString(); // e.g. 6/5/2025
    const timePart = date.toLocaleTimeString(); // e.g. 4:31:02 AM
    return { date: datePart, time: timePart };
  };

  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer]}
      contentContainerStyle={[GlobalStyle.GlobalsContentContainer]}
    >
      <ScrollView
        contentContainerStyle={{gap: 10, padding: 10}}
      >
        {logs && logs.map((log, index) => (
          <HStack key={index} style={{backgroundColor: Colors.PrimaryLight[6], borderRadius: BorderRadius.lg, padding: 10}}>
            <VStack>
              <Box>
                <Text style={[s.text]}>Action: {log.action}</Text>
              </Box>
              <Box>
                <Text style={[s.text]}>Table Name: {log.table_name}</Text>
              </Box>
              <Box>
                <Text style={[s.text]}>Record ID: {log.record_id}</Text>
              </Box>
              {log.created_at && (() => {
                const { date, time } = formatDateTime(log.created_at);
                return (
                  <VStack>
                    <Text style={[s.text]}>Created At:</Text>
                    <VStack style={[{marginLeft: 10}]}>
                      <Text style={[s.text]}>Date: {date}</Text>
                      <Text style={[s.text]}>Time: {time}</Text>
                    </VStack>
                  </VStack>
                );
              })()}


            </VStack>
            {log.changes && typeof log.changes === 'object' && Object.keys(log.changes).length > 0 ? (
              <Box>
                <Text style={[s.text, { fontWeight: 'bold' }]}>Changes:</Text>
                {Object.entries(log.changes).map(([key, value], i) => (
                  <Box key={i} style={{ marginLeft: 10, marginBottom: 4 }}>
                    <Text style={[s.text]}>
                      {key}: {String(value)}
                    </Text>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box>
                <Text style={[s.text]}>No changes recorded</Text>
              </Box>
            )}
            
          </HStack>
        ))}
      </ScrollView>
    </StaticScreenWrapper>
  )
}

const s = StyleSheet.create({
  borderGreen:{
    borderColor: 'green',
    borderWidth: 3
  },
  text:{
    color: 'white'
  }
})
