defmodule AppWeb.Game do
  defmodule Group do
    @derive Jason.Encoder
    defstruct name: "Stuff", level: 2, members: ["One", "Two", "Three", "Four"]
  end

  defmodule Game do
    @derive Jason.Encoder
    defstruct groups: [ %{title: "Movimentam o barco",
                                       level: 0,
                                       members: Enum.join([
                                       "Vela",
                                       "Motor",
                                       "Remo",
                                       "Corrente"
                                      ], ";")},
                       %{title: "Iluminadores",
                                        level: 1,
                                        members: Enum.join([
                                          "Lâmpada",
                                          "Lanterna",
                                          "Fogueira",
                                          "Lamparina"
                                        ], ";")},
                       %{title: "Gatos da ficção",
                                        level: 2,
                                        members: Enum.join([
                                          "Tom",
                                          "Frajola",
                                          "Salém",
                                          "Mingau"
                                        ], ";")},
                       %{title: "Características da música",
                                        level: 3,
                                        members: Enum.join([
                                          "Melodia",
                                          "Ritmo",
                                          "Harmonia",
                                          "Tempo"
                                        ], ";")}],
                        startingGroups: [["Lanterna", "Vela", "Melodia", "Tom"],
                                          ["Motor", "Fogueira", "Salém", "Ritmo"],
                                          ["Harmonia", "Tempo", "Mingau", "Corrente"],
                                          ["Remo", "Frajola", "Lamparina", "Lâmpada"]]

  end


  defstruct groups: [struct(Group, %{name: "Movimentam o barco",
                       level: 0,
                       members: [
                        "Vela",
                        "Motor",
                        "Remo",
                        "Corrente"
                       ]}),
                     struct(Group, %{name: "Iluminadores",
                      level: 1,
                      members: [
                        "Lâmpada",
                        "Lanterna",
                        "Fogueira",
                        "Lamparina"
                      ]}),
                     struct(Group, %{name: "Gatos da ficção",
                      level: 2,
                      members: [
                        "Tom",
                        "Frajola",
                        "Salém",
                        "Mingau"
                      ]}),
                     struct(Group, %{name: "Características da música",
                      level: 3,
                      members: [
                        "Melodia",
                        "Ritmo",
                        "Harmonia",
                        "Tempo"
                      ]})],
                      startingGroups: [["Lanterna", "Vela", "Melodia", "Tom"],
                                       ["Motor", "Fogueira", "Salém", "Ritmo"],
                                       ["Harmonia", "Tempo", "Mingau", "Corrente"],
                                       ["Remo", "Frajola", "Lamparina", "Lâmpada"]]
end
