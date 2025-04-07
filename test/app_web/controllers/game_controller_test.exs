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

  test "POST /", %{conn: conn} do
    conn = post(conn, ~p"/api/private/game", %{extra: nil, groups: []})

    assert json_response(conn, 422)["errors"] == "Put some group in that"
  end

  test "post right", %{conn: conn} do
    possible_groups = game_fixture()[:groups]
    others =    Enum.map(possible_groups, fn g -> %{level: g.level, title: g.title, members: String.split(g.members, ";")} end)

    conn = post(conn, ~p"/api/private/game", %{extra: nil, groups: others})

    assert json_response(conn, 422)["errors"]["extra"] == ["can't be blank"]

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
