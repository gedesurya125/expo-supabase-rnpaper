import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useBcItems } from '@/api/businessCentral/useBcItems';
import { List } from 'react-native-paper';
import { BcItem } from '@/api/businessCentral/types/item';
import { FlatList } from 'react-native-gesture-handler';
import { useBcItemPicture } from '@/api/businessCentral/useBcItemPicture';

export default function TabTwoScreen() {
  const bcItems = useBcItems();

  const items = bcItems?.data?.value;

  return (
    <ThemedView
      style={{
        flex: 1
      }}>
      <FlatList
        data={items}
        renderItem={({ item, index }) => {
          return <ListItem data={item} key={index} />;
        }}
      />
    </ThemedView>
  );
}
const ListItem = ({ data }: { data: BcItem }) => {
  const { data: picture } = useBcItemPicture({ itemId: data?.id });

  return (
    <ThemedView>
      {typeof picture === 'string' && (
        <Image source={{ uri: picture }} style={{ width: 100, height: 100 }} />
      )}
      <ThemedText>{data?.displayName}</ThemedText>
    </ThemedView>
  );
};
