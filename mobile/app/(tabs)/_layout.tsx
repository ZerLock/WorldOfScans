import React from 'react';
import { Stack } from 'expo-router';

export default function TabLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'World of Scans' }} />
            <Stack.Screen name="chapters" options={{ title: 'Chapter' }} />
            <Stack.Screen name="reader" options={{ title: 'Reader' }} />
        </Stack>
    );
}
