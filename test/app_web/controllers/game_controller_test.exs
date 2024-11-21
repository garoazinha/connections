defmodule AppWebGameControllerTest do
  use AppWeb.ConnCase
  alias App.Game
  alias App.Repo


  test "GET /", %{conn: conn} do
    joy = game_fixture()

    Game.changeset(%Game{}, %{groups: joy.groups, extra: "just got here bro"})
      |> Repo.insert()

    conn = get(conn, ~p"/api/game")
    assert json_response(conn, 200)["groups"] == [
      %{
        "title" => "Movimentam o barco",
        "level" => 0,
        "members" => ["Vela", "Motor", "Remo", "Corrente"]
      },
      %{
        "title" => "Iluminadores",
        "level" => 1,
        "members" => ["Lâmpada","Lanterna","Fogueira","Lamparina"]
      },
      %{
        "title" => "Gatos da ficção",
        "level" => 2,
        "members" => ["Tom","Frajola","Salém","Mingau"]
      },
      %{
        "title" => "Características da música",
        "level" => 3,
        "members" => ["Melodia","Ritmo","Harmonia","Tempo"]
      }

    ]
  end

  defp game_fixture() do
    %{extra: "you know",
      groups: [
        %{title: "Movimentam o barco",
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
              ["Remo", "Frajola", "Lamparina", "Lâmpada"]]}
  end
end
