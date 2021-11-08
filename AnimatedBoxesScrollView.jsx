import React from "react";
import { StyleSheet, Dimensions, Image, Platform } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
const { width } = Dimensions.get("screen");

const boxes = [
  {
    image:
      "https://images.unsplash.com/photo-1636289251590-3df17e09feb1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
    id: 1,
  },
  {
    image:
      "https://images.unsplash.com/photo-1636244411431-e4ac0ce7b52d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2232&q=80",
    id: 2,
  },
  {
    image:
      "https://images.unsplash.com/photo-1636269889678-72352ec79867?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1750&q=80",
    id: 3,
  },
  {
    image:
      "https://images.unsplash.com/photo-1636138105000-6e8eb02a744e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
    id: 4,
  },
  {
    image:
      "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80",
    id: 5,
  },
  {
    image:
      "https://images.unsplash.com/photo-1636220165133-35105c495c3f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80",
    id: 6,
  },
];

export default function AnimatedBoxesScrollView({ horizontal }) {
  const direction = useSharedValue(0);
  const valuesOfBoxes = boxes.map(() => useSharedValue(0));

  const scrollHandler = useAnimatedScrollHandler({
    onEndDrag: () => {
      direction.value = 0;
    },
    onScroll: (event, ctx) => {
      const contentOffsetXY = horizontal
        ? event.contentOffset.x
        : event.contentOffset.y;
      const yDirection = contentOffsetXY - (ctx?.y ?? 0);
      direction.value = Math.sign(yDirection);
      ctx.y = contentOffsetXY;
    },
  });

  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      onScroll={scrollHandler}
      horizontal={horizontal}
      decelerationRate={0.5}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      onMomentumScrollEnd={() =>
        Platform.select({ android: (direction.value = 0) })
      }
    >
      {boxes.map((item, i) => {
        const perspectiveStyle = useAnimatedStyle(() => {
          valuesOfBoxes[i].value = withSpring(
            interpolate(
              direction.value,
              [-1, 0, 1],
              [-5, 0, 5],
              Extrapolate.CLAMP
            )
          );
          return {
            transform: [
              { perspective: 200 },
              horizontal
                ? { rotateY: `${valuesOfBoxes[i].value}deg` }
                : { rotateX: `${valuesOfBoxes[i].value}deg` },
            ],
          };
        });

        return (
          <Animated.View
            key={item.id}
            style={[
              horizontal
                ? styles.horizontalScrollItem
                : styles.verticalScrollItem,
              perspectiveStyle,
            ]}
          >
            <Image style={styles.image} source={{ uri: item.image }} />
          </Animated.View>
        );
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 50,
    width: "100%",
  },
  verticalScrollItem: {
    flex: 1,
    height: 200,
    backgroundColor: "gray",
    margin: 30,
  },
  horizontalScrollItem: {
    height: 150,
    width: width / 2,
    backgroundColor: "gray",
    margin: 30,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
