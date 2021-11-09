import React from "react";
import { StyleSheet, Dimensions, Image, Platform, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
const { width } = Dimensions.get("screen");

export default function AnimatedBoxesScrollView({ horizontal, boxes }) {
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
    <View style={horizontal ? { height: 172, marginLeft: 18 } : { flex: 1 }}>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        horizontal={horizontal}
        decelerationRate={0.5}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={() =>
          Platform.select({ android: (direction.value = 0) })
        }
        nestedScrollEnabled={true}
        style={[
          horizontal ? styles.horizontalScrollView : styles.verticalScrollView,
        ]}
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
              <Image style={styles.image} source={item.image} />
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  verticalScrollView: {
    paddingHorizontal: 18,
    marginTop: 9,
  },
  horizontalScrollView: {
    backgroundColor: "#282A35",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    paddingLeft: 9,
    paddingRight: 9,
  },
  verticalScrollItem: {
    height: 200,
    marginVertical: 12,
  },
  horizontalScrollItem: {
    width: width * 0.7,
    marginHorizontal: 9,
    marginVertical: 18,
    height: 140,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
});
