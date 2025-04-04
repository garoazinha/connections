defmodule App.GameCreatorService do
  alias App.Repo
  alias App.Group
  alias App.Game

  def execute(groups) do
    processed_groups = process_groups(groups["groups"])
    # TODO add error handling?
    # TODO add to cookie?
    Game.changeset(%Game{}, %{groups: processed_groups, extra: "false"})
      |> Repo.insert!()

  end

  defp add_group(group) do

    %{
      level: group["level"],
      title: group["title"],
      members: Enum.join(Map.fetch!(group,"members"), ";")
    }
  end

  defp process_groups(groups) do
    Enum.map(groups, fn group -> add_group(group) end)
  end
end
