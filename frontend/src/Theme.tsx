import {
    theme as origTheme,
    extendTheme
  } from "@chakra-ui/react";
  //import '@fontsource-variable/lexend';
  const theme = extendTheme({
      fonts: {
        heading: "Tahoma, sans-serif",
        body: "ff-tisa-web-pro"
      },
      colors: {
        brand: {
          100: "#0025E4",
          200: "#2658FB",
          300: '#A10212',
          400: '#9DA7FF'
        },
        purpose: {
          100: "#e6a176",
          200: "#984464",
          300: "#cdcdcd"
        }
      },
      styles: {
        global: {
          body: {
            fontFamily: "Tahoma" 
          },   
          button: {
            //textTransform: "uppercase",
            _hover: {
              color: 'white',
              bg: 'brand.100'
            }
          },
          table: {
            fontFamily: "Tahoma ",
            color: "black"
          },
          option: {
            //textTransform: "uppercase"
          },     
          select: {
            //textTransform: "uppercase",
            bg: "brand.100",
            _hover: {
              bg: 'brand.300'
            }
          },
        }
  
      },
      components: {
        Button: {
            // 1. We can update the base styles
            baseStyle: {
              fontWeight: "semibold",
              fontFamily: "Tahoma",
              border: "1px solid",
              fontSize: "14px",
              lineHeight: "2.8em",
              outline: "none",
              borderRadius: "5px",
              color: "blue",
              padding: "0 5px",
              //textTransform: "uppercase",
            },
            // 2. We can add a new button size or extend existing
            sizes: {
              xl: {
                h: "56px",
                fontSize: "lg",
                px: "32px",
              },
            },
            variants: {
              solid: {
                _hover: {
                  bg: 'brand.200',
                  color: 'white'
                },
                _active: {
                  bg: 'brand.200',
                  color: 'white'
                },
                bg: "brand.100",
                color: "white",
                fontSize: "14px",
                letterSpacing: "0.1em",
                fontFamily: "Tahoma"
              },
              outline: {
                _hover: {
                  bg: 'brand.200',
                  color: 'white'
                },
                _active: {
                  bg: 'brand.200',
                  color: 'white'
                },
                bg: "white",
                color: "brand.100",
                fontSize: "14px",
                letterSpacing: "0.1em",
                fontFamily: "Tahoma"
              }
            },
          // 3. We can add a new visual variant
          defaultProps: {
            bg: "brand.100"
          }
        },
        Box: {
          variants: {
            header: {
  
              fontSize: "14px",
              letterSpacing: "0.1em",
              fontFamily: "Tahoma"
            },
          },
        },
        Alert: {
          variants: {
            solid: (props: any) => { // only applies to `subtle` variant
              const { colorScheme: c } = props
              if (c !== "red") {
                // use original definition for all color schemes except "blue"
                return origTheme?.components?.Alert?.variants?.subtle(props)
              }
              return {
                container: {
                  bg: 'brand.300', // or literal color, e.g. "#0984ff"
                },
              }
            }
          }
        },
        MenuItem: {
          // 1. We can update the base styles
          baseStyle: {
            field: {
              fontWeight: "500", // Normally, it is "semibold",
              fontFamily: "Tahoma",
              border: "0px solid",
              fontSize: "14px",
              lineHeight: "2.8em",
              outline: "none",
              borderRadius: "0px",
              color: "white",
              padding: "0 5px",
              textTransform: "uppercase",
              _hover: {
                bg: 'brand.200'
              },
            }
          },
          // 2. We can add a new button size or extend existing
          sizes: {
            xl: {
              h: "56px",
              fontSize: "lg",
              px: "32px",
            },
          },
          variants: {
            outline: {
              field: {
                _hover: {
                  bg: 'brand.200'
                },
                bg: "brand.300",
                color: "white",
                fontSize: "14px",
                letterSpacing: "0.1em",
                borderRadius: "0px",
                lineHeight: "2.8em"
              }
            },
          },
          // 3. We can add a new visual variant
          defaultProps: {
            _hover: {
              bg: 'brand.200'
            },
            bg: "brand.100"
          }
        },
        Select: {
          // 1. We can update the base styles
          baseStyle: {
            field: {
              fontWeight: "500", // Normally, it is "semibold",
              fontFamily: "Tahoma",
              border: "0px solid",
              fontSize: "14px",
              lineHeight: "2.8em",
              outline: "none",
              borderRadius: "0px",
              color: "white",
              padding: "0 5px",
              textTransform: "uppercase",
              _hover: {
                bg: 'brand.200'
              },
            }
          },
          // 2. We can add a new button size or extend existing
          sizes: {
            xl: {
              h: "56px",
              fontSize: "lg",
              px: "32px",
            },
          },
          variants: {
            outline: {
              field: {
                _hover: {
                  bg: 'brand.200'
                },
                bg: "brand.300",
                color: "white",
                fontSize: "14px",
                letterSpacing: "0.1em",
                borderRadius: "0px",
                lineHeight: "2.8em"
              }
            },
          },
          // 3. We can add a new visual variant
          defaultProps: {
            _hover: {
              bg: 'brand.200'
            },
            bg: "brand.100"
          }
        },
        Table: {
          // 1. We can update the base styles
          baseStyle: {
          },
          variants: {
            simple: {
              tbody:{
                borderCollapse: 'separate'
              },
              table: {
                fontFamily:'Tahoma',
                borderSpacing: 0,
                borderCollapse: 'separate',
                wordWrap: 'normal'
              },
              thead: {
                th:{
                  fontFamily:'Tahoma',
                  fontWeight: 400,
                  color: 'black',
                  borderBottom: '2px solid black'
                }
              },
              tfoot: {
                td:{
                  borderBottom: '0px solid black',
                  borderTop: '2px solid black'
                }
              },
              td: {
                fontSize: '8px',
                paddingInlineStart: '8px',
                paddingInlineEnd: '8px',
                borderCollapse: 'separate',
                wordWrap: 'normal',
                borderBottom: '2px solid grey'
                
              },
              th: {
                paddingInlineStart: '8px',
                paddingInlineEnd: '8px',
                borderCollapse: 'separate',
                wordWrap: 'normal',
                verticalAlign: 'bottom',
                borderBottom: '2px solid black'
              }
            },
          },
        },
        Popover: {
          baseStyle: {
            bg: 'white',
            body: {
              bg: 'white',
              border: '0px white solid'
            }
          }
        }
      },
    })
  
    export default theme