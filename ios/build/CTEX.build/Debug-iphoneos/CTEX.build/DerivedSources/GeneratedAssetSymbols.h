#import <Foundation/Foundation.h>

#if __has_attribute(swift_private)
#define AC_SWIFT_PRIVATE __attribute__((swift_private))
#else
#define AC_SWIFT_PRIVATE
#endif

/// The "SplashIcon" asset catalog image resource.
static NSString * const ACImageNameSplashIcon AC_SWIFT_PRIVATE = @"SplashIcon";

/// The "splash" asset catalog image resource.
static NSString * const ACImageNameSplash AC_SWIFT_PRIVATE = @"splash";

#undef AC_SWIFT_PRIVATE
