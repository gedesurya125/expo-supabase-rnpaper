import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useBcItems, usePaginatedBcItems } from '@/api/businessCentral/useBcItems';
import { List } from 'react-native-paper';
import { BcItem } from '@/api/businessCentral/types/item';
import { FlatList } from 'react-native-gesture-handler';
import { useBcItemPicture } from '@/api/businessCentral/useBcItemPicture';
import { memo } from 'react';

export default function ExplorePage() {
  const { data, fetchNextPage: fetchNextBcItems, isLoading } = usePaginatedBcItems();

  const hasItems = data?.pages && data?.pages?.length > 0;

  const dataToDisplay = hasItems
    ? data?.pages?.reduce<BcItem[]>((acc, cur) => {
        return [...acc, ...(cur?.value || [])];
      }, [])
    : [];

  // const items = bcItems?.data?.value;

  return (
    <ThemedView
      style={{
        flex: 1
      }}>
      <FlatList
        data={dataToDisplay}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item, index }) => {
          return <ListItem data={item} index={index} />;
        }}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          fetchNextBcItems();
        }}
      />
    </ThemedView>
  );
}
const ListItem = ({ data, index }: { data: BcItem; index?: number }) => {
  const { data: picture } = useBcItemPicture({ itemId: data?.id });
  return (
    <ThemedView>
      <CardPicture picture={picture} />
      <ThemedText>{data?.displayName}</ThemedText>
    </ThemedView>
  );
};

const CardPicture = memo(({ picture }: { picture: any }) => {
  return (
    typeof picture === 'string' && (
      <Image source={{ uri: picture }} style={{ width: 100, height: 100 }} />
    )
  );
});

CardPicture.displayName = 'CardPicture';
