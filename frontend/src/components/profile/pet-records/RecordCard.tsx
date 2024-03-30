import { Card, Text, Group, Badge } from '@mantine/core';


const PetRecords = ({ title, description, badge, badgeColor, link }: { title: string, description: string, badge: string, badgeColor: string, link: string }) => {
    return (
        <>
            <Card withBorder
                p="lg"
                shadow="sm"
                radius="md"
                onClick={() => window.location.href = link}
                style={{ cursor: 'pointer' }}
            >
            
            <Card.Section>
                
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{title}</Text>
                <Badge color={ badgeColor }>{badge}</Badge>
            </Group>

            <Text size="sm" c="dimmed">
                {description}
            </Text>
            </Card>
        </>
    )
}

export default PetRecords
